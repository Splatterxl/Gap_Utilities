@echo off

:Discord
echo Starting Discord
cd C:\Users\Owner\AppData\Local\Discord
start Update.exe
echo Started!

:VSCode
echo Starting VS Code...
cd "C:\Users\Owner\AppData\Local\Programs\Microsoft VS Code"
start Code.exe
echo Started!

:GitHub

goto Discord
goto VSCode

echo Initiated!
