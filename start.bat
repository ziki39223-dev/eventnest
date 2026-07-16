@echo off
chcp 65001 >nul
title EventNest - 社交活动管理小程序

echo ========================================
echo      EventNest - 社交活动管理小程序
echo ========================================
echo.

setlocal enabledelayedexpansion

:MENU
echo 请选择启动模式:
echo.
echo [1] H5 开发模式 (默认)
echo [2] 微信小程序开发模式
echo [3] H5 生产构建
echo [4] 微信小程序生产构建
echo [5] 运行单元测试
echo [0] 退出
echo.
set "choice="
set /p "choice=请输入选择 [1-5, 0]: "

if "%choice%"=="" set "choice=1"

if "%choice%"=="1" goto H5_DEV
if "%choice%"=="2" goto WEAPP_DEV
if "%choice%"=="3" goto H5_BUILD
if "%choice%"=="4" goto WEAPP_BUILD
if "%choice%"=="5" goto TEST
if "%choice%"=="0" goto EXIT

echo 无效选择，请重新输入
echo.
goto MENU

:CHECK_ENV
echo [1/3] 检查 Node.js 环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo      ERROR: Node.js 未安装或未添加到 PATH
    pause
    goto EXIT
)
for /f "delims=" %%v in ('node --version') do echo      Node.js 版本: %%v

echo [2/3] 检查 pnpm 环境...
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo      ERROR: pnpm 未安装，请运行: npm install -g pnpm
    pause
    goto EXIT
)
for /f "delims=" %%v in ('pnpm --version') do echo      pnpm 版本: %%v

echo [3/3] 检查项目依赖...
if not exist "node_modules" (
    echo      正在安装依赖...
    pnpm install
    if %errorlevel% neq 0 (
        echo      ERROR: 依赖安装失败
        pause
        goto EXIT
    )
    echo      依赖安装完成
) else (
    echo      依赖已存在
)
goto :EOF

:H5_DEV
call :CHECK_ENV
echo.
echo 启动 H5 开发服务器...
echo 访问地址: http://localhost:10086
echo.
echo 按 Ctrl+C 停止服务器
echo.
pnpm run dev:h5
goto EXIT

:WEAPP_DEV
call :CHECK_ENV
echo.
echo 启动微信小程序开发服务器...
echo 使用微信开发者工具打开 dist 目录
echo.
echo 按 Ctrl+C 停止服务器
echo.
pnpm run dev:weapp
goto EXIT

:H5_BUILD
call :CHECK_ENV
echo.
echo 构建 H5 生产版本...
echo.
pnpm run build:h5
if %errorlevel% equ 0 (
    echo.
    echo H5 构建完成，产物在 dist 目录
) else (
    echo.
    echo ERROR: H5 构建失败
)
pause
goto EXIT

:WEAPP_BUILD
call :CHECK_ENV
echo.
echo 构建微信小程序生产版本...
echo.
pnpm run build:weapp
if %errorlevel% equ 0 (
    echo.
    echo 小程序构建完成，产物在 dist 目录
) else (
    echo.
    echo ERROR: 小程序构建失败
)
pause
goto EXIT

:TEST
call :CHECK_ENV
echo.
echo 运行单元测试...
echo.
pnpm test
pause
goto EXIT

:EXIT
endlocal
echo.
echo 感谢使用 EventNest!