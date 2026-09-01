command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Work around Git Bash and Yarn losing access to the terminal on Windows.
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
