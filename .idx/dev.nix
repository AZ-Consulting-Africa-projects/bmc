{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.openssl
  ];
  idx.extensions = [
 "bradlc.vscode-tailwindcss"
 "formulahendry.auto-close-tag"
 "formulahendry.auto-rename-tag"
 "lightyen.tailwindcss-intellisense-twin"
 "redwan-hossain.auto-rename-tag-clone"
 "steoates.autoimport"
 "Prisma.prisma"
 "Prisma.prisma-insider"
 "rangav.vscode-thunder-client"
 "zardoy.js-debug-extras"
 "dsznajder.es7-react-js-snippets"
 "edwinhuish.better-comments-next"
 "PulkitGangwar.nextjs-app-directory-commands"
 "PulkitGangwar.nextjs-snippets"
 "YuTengjing.vscode-fe-helper"];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}