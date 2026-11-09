desc('Compile the files of Concise Framework.')
task('concise', () => {
  jake.exec('concisecss compile dist.scss dist/concise-ui.css', {
    printStdout: true,
    printStderr: true
  }, () => {
    complete()
  })
})

desc('Minify CSS.')
task('minify', () => {
  jake.exec('cssnano dist/concise-ui.css dist/concise-ui.min.css', {
    printStdout: true,
    printStderr: true
  }, () => {
    complete()
  })
})

desc('Compile styles on file changes')
task('concise:watch', () => {
  jake.exec('chokidar "**/*.scss" -c "jake build"', {
    printStdout: true,
    printStderr: true
  }, () => {
    complete()
  })
})

desc('Start livereload server.')
task('livereload', () => {
  jake.exec('livereload . -e "html, css"', {
    printStdout: true,
    printStderr: true
  }, () => {
    complete()
  })
})

desc('Start HTTP server.')
task('http', () => {
  jake.exec('http-server .', {
    printStdout: true,
    printStderr: true
  }, () => {
    complete()
  })
})

desc('Build the files.')
task('build', () => {
  jake.Task['concise'].invoke()
  jake.Task['minify'].invoke()
})

desc('Start the development tasks.')
task('default', () => {
  jake.Task['build'].invoke()
  jake.Task['concise:watch'].invoke()
  jake.Task['http'].invoke()
  jake.Task['livereload'].invoke()
})