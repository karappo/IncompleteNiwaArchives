#!/bin/bash
echo "Deploy to '$1'"
if [ $1 = 'production' ]; then
  DEPLOY_ENV='PRODUCTION'
  # DEPLOY_DIR='TODO'
elif [ $1 = 'test' ]; then
  DEPLOY_ENV='TEST'
  DEPLOY_DIR='sites/niwa.karappo.net'
else
  echo "Target is not defined."
  exit 1
fi

if yarn generate; then
  # Remove useless files
  find ./dist/ -name '.DS_Store' -type f -delete
  find ./dist/ -name '.nojekyll' -type f -delete
  if npm run rename; then
    # remove "DEP_XXX_RM "
    ext=".temp_bakup" # extension of backup files which are created before replacement
    find ./dist/ -name "*.htaccess" -exec sed -i$ext "s|#DEP_REMOTE_RM ||" {} \;
    find ./dist/ -name "*.htaccess" -exec sed -i$ext "s|#DEP_"$DEPLOY_ENV"_RM ||" {} \;
    find ./dist/ -name "*.php" -exec sed -i$ext "s|//DEP_REMOTE_RM ||" {} \;
    find ./dist/ -name "*.php" -exec sed -i$ext "s|//DEP_"$DEPLOY_ENV"_RM ||" {} \;
    find ./dist/ -name "*$ext" -exec rm {} \; # delete backup files
    # Deploy
    rsync -aIzhv --stats --delete -e "ssh -p 2222" "--exclude-from=$PWD/.depignore" ./dist/ karappo@ssh-karappo.heteml.net:/home/users/0/karappo/web/$DEPLOY_DIR
    npm run rename-back
  fi
fi
