#!/usr/bin/env ruby
require 'json'

root = File.expand_path(File.dirname(File.dirname(__FILE__)))

return if File.directory?(ARGV[0])

f = File.read(ARGV[0])

settings = JSON.parse(File.read(File.join(root, 'src/config/settings_data.json')))

settings = settings["current"]

settings.each do |name, value|
  search = /\{\{\s*settings.#{name}\s*\}\}/
  # puts "name: #{name.inspect}"
  # puts "value: #{value.to_s}"
  f = f.gsub(search, value.to_s)
end

File.write(ARGV[0], f)