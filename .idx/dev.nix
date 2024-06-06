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
 "Prisma.prisma-insider"];
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