interface PerformanceEvent {
  name: string
  startTime: number
  endTime?: number
  duration?: number
  data?: Record<string, unknown>
  error?: Error
}

// 生产环境关闭性能日志输出（事件仍会记录在内存中，可按需上报）
const logEnabled = process.env.NODE_ENV !== 'production'

const performanceEvents: PerformanceEvent[] = []
const timers = new Map<string, number>()

export function startTimer(name: string): void {
  timers.set(name, Date.now())
}

export function endTimer(name: string, data?: Record<string, unknown>): number | null {
  const startTime = timers.get(name)
  if (!startTime) {
    return null
  }
  const endTime = Date.now()
  const duration = endTime - startTime
  timers.delete(name)

  const event: PerformanceEvent = {
    name,
    startTime,
    endTime,
    duration,
    data
  }
  performanceEvents.push(event)

  if (logEnabled) {
    console.log(`[Performance] ${name}: ${duration}ms`, data)
  }

  return duration
}

export function trackEvent(name: string, data?: Record<string, unknown>): void {
  const event: PerformanceEvent = {
    name,
    startTime: Date.now(),
    data
  }
  performanceEvents.push(event)

  if (logEnabled) {
    console.log(`[Performance] Track: ${name}`, data)
  }
}

export function trackError(name: string, error: Error, data?: Record<string, unknown>): void {
  const event: PerformanceEvent = {
    name,
    startTime: Date.now(),
    error,
    data
  }
  performanceEvents.push(event)

  console.error(`[Performance] Error: ${name}`, error, data)
}

/**
 * 服务层统一埋点包装器：消除各 service 中重复的
 * startTimer / try / endTimer / trackError 样板代码。
 *
 * @example
 * withTracking('event.getEvents',
 *   () => callFunction<Event[]>('getEvents', params),
 *   { successData: (r) => ({ count: r.length }) })
 */
export async function withTracking<T>(
  name: string,
  fn: () => Promise<T>,
  options?: {
    successData?: (result: T) => Record<string, unknown>
    errorData?: Record<string, unknown>
  }
): Promise<T> {
  startTimer(name)
  try {
    const result = await fn()
    endTimer(name, options?.successData?.(result))
    return result
  } catch (err) {
    endTimer(name, { success: false })
    trackError(`${name}.error`, err as Error, options?.errorData)
    throw err
  }
}

export function getPerformanceEvents(): PerformanceEvent[] {
  return [...performanceEvents]
}

export function clearPerformanceEvents(): void {
  performanceEvents.length = 0
  timers.clear()
}

export function logPerformanceSummary(): void {
  if (!logEnabled) return
  console.log('[Performance] Summary:')
  performanceEvents.forEach(event => {
    if (event.duration) {
      console.log(`  - ${event.name}: ${event.duration}ms`)
    } else {
      console.log(`  - ${event.name}: tracked at ${new Date(event.startTime).toISOString()}`)
    }
  })
}