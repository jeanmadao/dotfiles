const resetCss = async () => {
    try {
        const scss = `${App.configDir}/style/style.scss`
        const css = `/tmp/ags/style.css`

        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    } catch (error) {
        error instanceof Error 
	    ? logError(error) 
	    : console.error(error)
    }
}

Utils.monitorFile(`${App.configDir}/style`, resetCss)
await resetCss()
