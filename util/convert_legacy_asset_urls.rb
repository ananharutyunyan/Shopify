#!/usr/bin/env ruby

# move js to vendors

# `mv assets/*.js vendors/`

substitutions = [
  {
    # convert liquid script_tag to <script>, with passthrough quoting
    regex: /\{\{\s*['"]([^'"]+)['"]\s*\|\s*asset_url\s*\|\s*script_tag\s*\}\}/,
    replace: %q(<script src='{{ "\1" | asset_url }}'>)
  },
  {
  # convert liquid stylesheet_tag to <script>, with passthrough quoting
    regex: /\{\{\s*['"]([^'"]+)['"]\s*\|\s*asset_url\s*\|\s*stylesheet_tag\s*\}\}/,
    replace: %q(<link rel="stylesheet" type="text/css" href='{{ "\1" | asset_url }}'>)
  },
  {
    # convert src with liquid to passthrough quoting
    regex: /src="\s*(\{\{\s*)'([^']+)'(( *\|\s*(?!shopify_asset_url)\w+)*\s*\}\})\s*"/,
    replace: %q(src='\1"\2"\3')
  }
]

f = File.read(ARGV[0])
substitutions.each{|s| f.gsub!(s[:regex], s[:replace])}
File.write(ARGV[0], f)