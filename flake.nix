{
  description = "legacy - worldbuilding project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            bun

            # Browsers for Playwright (page-overflow checker). On NixOS the
            # Playwright-bundled prebuilt Chromium is dynamically linked and
            # cannot run without nix-ld, so use the Nix-provided browser
            # instead. Pin @playwright/test to the matching version in
            # package.json so the npm-expected browser revision matches what
            # this driver provides.
            playwright-driver.browsers
          ];

          shellHook = ''
            # Make Playwright use the Nix-provided browsers instead of its own
            # download. The skip-validate flag stops Playwright probing host
            # libs (those are already satisfied by the Nix browser closure).
            export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
          '';
        };
      }
    );
}
