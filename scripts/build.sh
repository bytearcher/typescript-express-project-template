#!/usr/bin/env bash

# Common header
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
. "$DIR/common.sh"
cd "$DIR/.."

function mkdirs {
    mkdir_if dist
    mkdir_if dist/src
    mkdir_if dist/src/css
    mkdir_if dist/src/views
    mkdir_if dist/scss_to_css
    mkdir_if dist/src/public/css
}

function copy_views {
    rsync -am --include='*.pug' --include='*/' --exclude='*' src/views dist/src
}

function css_sass_site {
    node-sass \
        --quiet \
        --include-path bower_components/breakpoint-sass/stylesheets \
        src/scss/site.scss \
        dist/scss_to_css/site.css
}

function css_autoprefix_n_minimize {
    cat \
    dist/scss_to_css/site.css \
    | postcss --use autoprefixer \
    | if [ "$NODE_ENV" = "production" ] ; then cleancss -d ; else cat ; fi \
    > dist/src/public/css/site.css
}

function ts {
    tsc
}

function default {
    echo "Building"

    mkdirs

    tsc

    css_sass_site
    css_autoprefix_n_minimize

    copy_views
}

if [ "$#" == 0 ] ; then
    default
else

    while (( "$#" )); do
        echo "$1"
        eval "$1"
        shift
    done
    echo "done"
fi
