#!/usr/bin/env bash
# scripts/run-e2e.sh
#!/usr/bin/env bash
# DIR="$(cd "$(dirname "$0")" && pwd)"
# $DIR/db-startup.sh
# +
# +if [ "$#" -eq  "0" ]
# +  then
# +    npx playwright test
# +else
# +    npx playwright test --headed
# +fi
# +npx playwright show-report


#!/usr/bin/env bash
# scripts/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
# docker-compose up -d
# echo '🟡 - Waiting for database to be ready...'
# $DIR/wait-for-it.sh "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNzAyNWVjZWQtZDdmNi00NWYyLWJmYmUtMDFiZjZiZTZhNWM2IiwidGVuYW50X2lkIjoiZTc1Nzg4N2FiOGNmYjZkZDdlODNjNjJjYWM2MTdiNDE5YTY1YzNiMTFlMjlkMmY1NjU2OTc4OWRlNGQxY2RmMCIsImludGVybmFsX3NlY3JldCI6IjQ3ZTNmMmYzLTRlODUtNGFlYi1iYzkwLWVkZmJkNjBlNTc2ZSJ9.gE1V_O7ExLk_d1ULmBlfdpSBd77uoJYf_IvB1RFrFPM" -t 15 -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
# if [ "$#" -eq  "0" ]
#   then
#     npx playwright test
# else
#     npx playwright test --headed
# fi