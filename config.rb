# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page "/feed.xml", layout: false


# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end

activate :blog do |blog|
    blog.permalink = "journal-{title}-{year}-{month}"
    blog.sources = "journal/{title}-{year}-{month}.html"
    blog.tag_template = "tag.html"
    blog.taglink = "tag-{tag}.html"
end

activate :directory_indexes


# Sprockets
activate :sprockets
sprockets.append_path File.join(root, 'node_modules')
sprockets.append_path File.join(root, 'source/stylesheets')
sprockets.append_path File.join(root, 'node_modules/bootstrap-4-grid/scss')
sprockets.append_path File.join(root, 'node_modules/typesplit')
sprockets.append_path File.join(root, 'node_modules/scrollmagic/scrollmagic/uncompressed')
sprockets.append_path File.join(root, 'node_modules/scrollmagic/scrollmagic/uncompressed/plugins')
sprockets.append_path File.join(root, 'node_modules/barba.js/dist')

configure :build do
  activate :minify_css
  activate :minify_javascript
end
