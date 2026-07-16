interface PerformanceEvent {
  name: string
  startTime: number
  endTime?: number
  duration?: number
  data?: Record<string, unknown>
  error?: Error
}

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
  
  console.log(`[Performance] ${name}: ${duration}ms`, data)
  
  return duration
}

export function trackEvent(name: string, data?: Record<string, unknown>): void {
  const event: PerformanceEvent = {
    name,
    startTime: Date.now(),
    data
  }
  performanceEvents.push(event)
  
  console.log(`[Performance] Track: ${name}`, data)
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

export function getPerformanceEvents(): PerformanceEvent[] {
  return [...performanceEvents]
}

export function clearPerformanceEvents(): void {
  performanceEvents.length = 0
  timers.clear()
}

export function logPerformanceSummary(): void {
  console.log('[Performance] Summary:')
  performanceEvents.forEach(event => {
    if (event.duration) {
      console.log(`  - ${event.name}: ${event.duration}ms`)
    } else {
      console.log(`  - ${event.name}: tracked at ${new Date(event.startTime).toISOString()}`)
    }
  })
}