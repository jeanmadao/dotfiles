return {
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  config = function ()
    local configs = require("nvim-treesitter.configs")

    configs.setup({
      ensure_installed = { "c", "lua", "vim", "vimdoc", "query", "javascript", "html", "bash", "diff", "lua", "luadoc", "markdown", "markdown_inline", "rust", "python" },
      auto_install = false,
      sync_install = false,
      highlight = { enable = true },
      indent = { enable = true },
    })
  end
}
