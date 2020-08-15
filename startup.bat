@echo off



goto Discord

:Discord
echo Starting Discord...
cd C:\Users\Owner\AppData\Local\Discord
start Update.exe
echo Started!
goto GitHub

:GitHub
echo Starting GitHub Desktop...
cd C:\Users\Owner\AppData\Local\GitHubDesktop
start GitHubDesktop.exe
echo Started!

echo Startup Programs have been initiated.
