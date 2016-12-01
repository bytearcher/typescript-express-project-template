: ${NODE_ENV:="development"}

set -eu -o pipefail
shopt -s failglob

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PATH="$PATH:$DIR/../node_modules/.bin"

if [ "$NODE_ENV" = "production" ] ; then
    echo "Production mode"
else
    echo "Development (NODE_ENV=$NODE_ENV) mode"
fi

function mkdir_if {
    if [ ! -d "$1" ] ; then
        mkdir -p "$1"
    fi
}
