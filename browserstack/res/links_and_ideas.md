[setup to differentiate in-progress features](http://blog.josephwilk.net/ruby/cucumber-tags-and-continuous-integration-oh-my.html)
-- use a custom formatter so that @in-progress features stop the build when they pass (ie, when you're developing an in-progress feature that passes is a failure, when you're finished and it should pass you'll remove @in-progress)
