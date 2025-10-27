@echo off
rem pull first
git pull
rem in case of untracked changes
git add * 
rem stage everything
git stage *
rem as we don't specify -m, it'll ask for the message
git commit
rem finally, push
git push