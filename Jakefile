desc('Compile the files of Concise Framework.')
task('concise', () => {
  jake.exec('concisecss compile concise.scss dist/concise.css', {
    printStdout: true,
    printStderr: true
  }, () => {
    complete()
  })
})

desc('Minify CSS.')
task('minify', () => {
  jake.exec('cssnano dist/concise.css dist/concise.min.css', {
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

desc('Build the files for distribution.')
task('build', () => {
  jake.Task['concise'].invoke()
  jake.Task['minify'].invoke()
})

desc('Start the development tools.')
task('default', () => {
  jake.Task['build'].invoke()
  jake.Task['concise:watch'].invoke()
  jake.Task['http'].invoke()
  jake.Task['livereload'].invoke()
})