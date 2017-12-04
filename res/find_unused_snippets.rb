#!/usr/bin/env ruby
require 'awesome_print'

raise "no snippets dir" unless File.exist?('./snippets')

puts ARGV.inspect
unused = []
snippets = Dir.glob("snippets/*.liquid")
# ap snippets
snippets.each do |snippet|
  name = snippet.sub('snippets/', '').sub('.liquid', '')
  # puts name
  expr = %Q{include *['\\"]#{name}['\\"]}
  cmd = %Q{ag -l "#{expr}"}

  used_in = `#{cmd}`
  used_in = used_in.lines
  used_in.delete(snippet)
  # puts "#{snippet.ljust(40)}#{used_in.length}"
  if used_in.length < 1
    unused << snippet
  end
end

if ARGV.first == "-d"
  unused.each do |s|
    `git rm #{s}`
  end
else
  puts unused
end
