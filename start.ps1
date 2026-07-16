param(
    [Parameter(Mandatory=$false)]
    [string]$Mode = "h5"
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     EventNest - 社交活动管理小程序" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    Write-Host "[1/3] 检查 Node.js 环境..." -ForegroundColor Yellow
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Node.js 未安装或未添加到 PATH"
    }
    Write-Host "      Node.js 版本: $nodeVersion" -ForegroundColor Green

    Write-Host "[2/3] 检查 pnpm 环境..." -ForegroundColor Yellow
    $pnpmVersion = pnpm --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "pnpm 未安装，请运行: npm install -g pnpm"
    }
    Write-Host "      pnpm 版本: $pnpmVersion" -ForegroundColor Green

    Write-Host "[3/3] 检查项目依赖..." -ForegroundColor Yellow
    if (-not (Test-Path "node_modules")) {
        Write-Host "      正在安装依赖..." -ForegroundColor Yellow
        pnpm install
        if ($LASTEXITCODE -ne 0) {
            throw "依赖安装失败"
        }
        Write-Host "      依赖安装完成" -ForegroundColor Green
    } else {
        Write-Host "      依赖已存在" -ForegroundColor Green
    }

    Write-Host ""
    Write-Host "启动模式: $Mode" -ForegroundColor Cyan
    Write-Host ""

    switch ($Mode.ToLower()) {
        "h5" {
            Write-Host "启动 H5 开发服务器..." -ForegroundColor Green
            Write-Host "访问地址: http://localhost:10086" -ForegroundColor Green
            Write-Host ""
            Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Yellow
            pnpm run dev:h5
        }
        "weapp" {
            Write-Host "启动微信小程序开发服务器..." -ForegroundColor Green
            Write-Host "使用微信开发者工具打开 dist 目录" -ForegroundColor Green
            Write-Host ""
            Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Yellow
            pnpm run dev:weapp
        }
        "build:h5" {
            Write-Host "构建 H5 生产版本..." -ForegroundColor Green
            pnpm run build:h5
            if ($LASTEXITCODE -eq 0) {
                Write-Host "H5 构建完成，产物在 dist 目录" -ForegroundColor Green
            }
        }
        "build:weapp" {
            Write-Host "构建微信小程序生产版本..." -ForegroundColor Green
            pnpm run build:weapp
            if ($LASTEXITCODE -eq 0) {
                Write-Host "小程序构建完成，产物在 dist 目录" -ForegroundColor Green
            }
        }
        "test" {
            Write-Host "运行单元测试..." -ForegroundColor Green
            pnpm test
        }
        default {
            Write-Host "不支持的模式: $Mode" -ForegroundColor Red
            Write-Host "支持的模式: h5, weapp, build:h5, build:weapp, test" -ForegroundColor Yellow
            exit 1
        }
    }
} catch {
    Write-Host ""
    Write-Host "错误: $_" -ForegroundColor Red
    exit 1
}