#!/bin/bash

# Recreate config file
rm -rf ./public/env-config.js
touch ./public/env-config.js

# Add assignment 
echo "/* eslint-disable */" >> ./public/env-config.js
echo "window._env_ = {" >> ./public/env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # skip empty lines
  echo "* Read line from .env: " $line
  if [ -z "$line" ]; then
    echo "  - Skipping, line is empty!"
    continue
  fi

  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  echo "  - Found variable in .env: " $varname
  echo "  - Variable has value: " $varvalue

  # check if it is safe to publish var
  # it will be available ni browser
  # so only vars beginning with REACT_APP are permitted 
  if [[ $varname != "REACT_APP"* ]]; then
    echo "  - Variable name does not start from REACT_APP, skipping!"
    continue
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  if [ -z $value ]; then
    value=${varvalue}
  else
    echo "  - Same variable was found in env vars. Using value from env vars not from .env file!"
    echo "  - Variable has value: " $value
  fi

  # Append configuration property to JS file
  echo "  - Saving to env-config.js!"

  echo "  $varname: '$value'," >> ./public/env-config.js
done < ./.env

echo "}" >> ./public/env-config.js