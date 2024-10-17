export VISUAL=nvim
export EDITOR=nvim
export BROWSER=firefox-developer-edition

typeset -U path PATH
path=(~/.local/bin $path)
path=(~/.cargo/bin $path)
export PATH
