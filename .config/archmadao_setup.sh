#!/bin/sh

USERNAME=$(whoami)


SYSTEM_PACKAGES="\
    dkms \
    reflector \
    pacman-contrib \
    xdg-user-dirs \
    pass \
    wireguard-tools \
    openssh \
    unzip \
    wget \
    ripgrep \
    fd \
    noto-fonts \
    noto-fonts-emoji \
    noto-fonts-cjk \
    ttf-firacode-nerd \
    ttf-liberation \
    tree-sitter-cli \
    ffmpegthumbnailer \
    p7zip \
    jq \
    poppler \
    fzf \
    zoxide \
    imagemagick \
    libnotify \
    cronie \
    sddm \
    "

TERMINAL_PACKAGES="\
    kitty \
    zsh \
    zsh-completions \
    zsh-syntax-highlighting \
    zsh-autosuggestions
    git \
    neovim \
    yazi \
    starship \
    btop \
    lazygit \
    "

DEVELOPMENT_PACKAGES="\
    python \
    python-pip \
    pyright \
    rustup \
    rust-analyzer \
    lua \
    lua-language-server \
    stylua \
    luarocks \
    bun-bin \
    typescript-language-server \
    prettier \
    sassc \
    "

NVIDIA_PACKAGES="\
    nvidia-dkms \
    nvidia-utils \
    lib32-nvidia-utils \
    egl-wayland \
    "

DESKTOP_PACKAGES="\
    xorg-xwayland \
    hyprland \
    hyprpaper \
    hyprlock \
    xdg-desktop-portal-hyprland \
    dunst \
    polkit-kde-agent \
    qt5-wayland \
    qt6-wayland \
    qt5-graphicaleffects \
    aylurs-gtk-shell \
    wofi \
    wl-clipboard \
    gtk3 \
    gtk4 \
    glfw \
    glew \
    "

SOUND_PACKAGES="\
    pipewire \
    lib32-pipewire \
    pipewire-audio \
    pipewire-alsa \
    pipewire-pulse \
    pipewire-jack \
    lib32-pipewire-jack \
    pavucontrol \
    wireplumber \
    "

BLACKARCH_PACKAGES="\
    burpsuite \
    ghidra \
    gdb \
    nmap \
    wireshark-qt \
    hashcat \
    "

APP_PACKAGES="\
    firefox-developer-edition \
    thunderbird \
    vesktop-bin \
    spotify-launcher \
    steam \
    wine \
    wine-mono \
    wine-gecko \
    heroic-games-launcher-bin \
    geoclue \
    dolphin \
    gammastep \
    grim \
    slurp \
    zathura \
    zathura-pdf-poppler \
    obs-studio \
    mpv \
    qbittorrent \
    stremio \
    "


PACKAGES="$SYSTEM_PACKAGES $TERMINAL_PACKAGES $DEVELOPMENT_PACKAGES $NVIDIA_PACKAGES $DESKTOP_PACKAGES $SOUND_PACKAGES $BLACKARCH_PACKAGES $APP_PACKAGES" 

err() {
    echo >&2 "$(tput bold; tput setaf 1)[-] ERROR: ${*}$(tput sgr0)"

    exit 1337
}

warn() {
    echo >&2 "$(tput bold; tput setaf 1)[!] WARNING: ${*}$(tput sgr0)"
}

msg() {
    echo "$(tput bold; tput setaf 2)[+] ${*}$(tput sgr0)"
}

pacman_setup() {
    msg 'pacman setup...'
    sudo mv /etc/pacman.conf /etc/pacman.conf.bak
    sudo sh -c "sed 's/#ParallelDownloads/ParallelDownloads/' /etc/pacman.conf.bak > /etc/pacman.conf"
    sudo mv /etc/pacman.conf /etc/pacman.conf.bak
    sudo sh -c "sed 's/#Color/Color/' /etc/pacman.conf.bak > /etc/pacman.conf"
    sudo mv /etc/pacman.conf /etc/pacman.conf.bak
    sudo sh -c "cat >> "/etc/pacman.conf.bak" << EOF

    [multilib]
    Include = /etc/pacman.d/mirrorlist
    EOF"
    sudo cp /etc/pacman.conf.bak /etc/pacman.conf
    sudo rm /etc/pacman.conf.bak
    sudo pacman -Syu
}

blackarch_install() {
    msg 'installing BlackArch...'
    if ! curl -O https://blackarch.org/strap.sh; then
        err "couldn't fetch BlackArch strap.sh"
    fi

    if ! echo 26849980b35a42e6e192c6d9ed8c46f0d6d06047 strap.sh | sha1sum -c; then
        err "BlackArch strap.sh hash doesn't correspond"
    fi

    chmod +x strap.sh

    if ! sudo ./strap.sh; then
        err "wasn't able to install BlackArch"
    fi

    rm strap.sh

    sudo pacman -Syu
}

reflector_install() {
    msg 'installing reflector...'
    if ! sudo pacman -S reflector; then
        err "wasn't able to download reflector"
    fi

    systemctl enable reflector.timer
    systemctl start reflector.timer
}


yay_install() {
    msg 'installing yay...'
    if ! sudo pacman -S --needed git base-devel; then
        err "couldn't download git and/or base-devel packages"
    fi

    if ! git clone https://aur.archlinux.org/yay.git; then
        err "couldn't clone the yay AUR repository"
    fi

    cd yay

    if ! makepkg -si; then
        err "couldn't build yay packages"
    fi

    yay -Y --gendb
    yay -Syu --devel
    yay -Y --devel --save

    yay

    cd ..
    rm -rf yay
}

initial_setup() {
    msg 'initial setup...'
    timedatectl set-ntp true
    pacman_setup
    blackarch_install
    reflector_install
    yay_install
}

packages_install() {
    msg "installing packages..."
    if ! yay; then
        err "wasn't able to upgrade the packages"
    fi

    if ! yay -S --needed $PACKAGES; then
        err "couldn't download all the packages"
    fi
}

# hyprland_setup() {
# }

system_setup() {
    msg "system setup..."
    systemctl enable paccache.timer
    systemctl enable cronie.service
    systemctl enable sddm.service

    sudo mv /etc/mkinitcpio.conf /etc/mkinitcpio.conf.bak
    sudo sh -c "sed 's/kms //' /etc/mkinitcpio.conf.bak > /etc/mkinitcpio.conf"
    sudo mv /etc/mkinitcpio.conf /etc/mkinitcpio.conf.bak
    sudo sh -c "sed 's/MODULES=()/MODULES=(nvidia nvidia_modeset nvidia_uvm nvidia_drm)/' /etc/mkinitcpio.conf.bak > /etc/mkinitcpio.conf"
    sudo rm /etc/mkinitcpio.conf.bak

    sudo sh -c "echo 'options nvidia_drm modeset=1 fbdev=1' > /etc/modprobe.d/nvidia.conf"

    sudo mkinitcpio -P

    xdg-user-dirs-update

    chsh -s /usr/bin/zsh

    rustup default stable
}

archmadao_setup()
{
    msg "installing archmadao..."
    # initial_setup
    packages_install
    # system_setup
    # hyprland_setup

}

archmadao_setup
