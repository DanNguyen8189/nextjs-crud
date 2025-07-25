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
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
if [ "$#" -eq  "0" ]
  then
    npx playwright test
else
    npx playwright test --headed
fi