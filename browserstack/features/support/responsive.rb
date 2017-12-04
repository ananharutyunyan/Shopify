def resize_window(w, h)
  window = Capybara.current_session.current_window
  window.resize_to(w, h) # width, height
end

Before '@desktop' do
  puts "resizing window for desktop"
  resize_window(1024, 768) # width, height
end

Before '@mobile' do
  puts "resizing window for mobile"
  resize_window(480, 640) # width, height
end