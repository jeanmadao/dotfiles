return {
  "OXY2DEV/markview.nvim",
  lazy = false,      -- Recommended
  -- ft = "markdown" -- If you decide to lazy-load anyway

  dependencies = {
    -- You will not need this if you installed the
    -- parsers manually
    -- Or if the parsers are in your $RUNTIMEPATH
    "nvim-treesitter/nvim-treesitter",

    "nvim-tree/nvim-web-devicons"
  },
  opts = {
    modes = { "n", "no", "c" },
    hybrid_modes = { "n" },

    -- This is nice to have
    callbacks = {
      on_enable = function (_, win)
        vim.wo[win].conceallevel = 2;
        vim.wo[win].concealcursor = "nc";
      end
    }
  }
}
