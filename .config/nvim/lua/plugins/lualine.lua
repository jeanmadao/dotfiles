return {
    {
        "nvim-lualine/lualine.nvim",
        dependencies = { "nvim-tree/nvim-web-devicons" },
        config = function()
            require("lualine").setup({
                options = {
                    icons_enabled = true,
                    theme = "gruvbox",
                    component_separators = { left = "", right = ""},
                    section_separators = { left = "", right = ""},
                    disabled_filetypes = {
                        statusline = {},
                        winbar = {},
                    },
                    ignore_focus = {},
                    always_divide_middle = true,
                    globalstatus = false,
                    refresh = {
                        statusline = 1000,
                        tabline = 1000,
                        winbar = 1000,
                    }
                },
                sections = {
                    lualine_a = {"mode"},
                    lualine_b = {"branch", "diff", "diagnostics"},
                    lualine_c = {"filename"},
                    lualine_x = {"encoding", "fileformat", "filetype"},
                    lualine_y = {"progress"},
                    lualine_z = {"location"}
                },
                inactive_sections = {
                    lualine_a = {},
                    lualine_b = {},
                    lualine_c = {"filename"},
                    lualine_x = {"location"},
                    lualine_y = {},
                    lualine_z = {}
                },
                winbar = {},
                inactive_winbar = {},
                extensions = {},
            })
        end,
    },
    { 
        "akinsho/bufferline.nvim",
        version = "*",
        dependencies = "nvim-tree/nvim-web-devicons",
        after = "catppucin",
        config = function()
            local bufferline = require("bufferline")
            bufferline.setup({
                options = {
                    mode = "buffers",
                    style_preset = bufferline.style_preset.default,
                },
            })
        end,
    },
}
