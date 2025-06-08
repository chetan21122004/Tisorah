-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  author_image VARCHAR(255) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category_id INTEGER REFERENCES blog_categories(id),
  reading_time VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_categories_slug_idx ON blog_categories(slug);

-- Create RLS policies
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read blog posts and categories
CREATE POLICY "Anyone can read blog categories" 
ON blog_categories FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Anyone can read blog posts" 
ON blog_posts FOR SELECT 
TO authenticated, anon
USING (true);

-- Only admins can modify blog posts and categories
CREATE POLICY "Only admins can insert blog categories" 
ON blog_categories FOR INSERT 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update blog categories" 
ON blog_categories FOR UPDATE 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete blog categories" 
ON blog_categories FOR DELETE 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can insert blog posts" 
ON blog_posts FOR INSERT 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update blog posts" 
ON blog_posts FOR UPDATE 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete blog posts" 
ON blog_posts FOR DELETE 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Insert sample category data
INSERT INTO blog_categories (name, slug, description)
VALUES
('Industry Trends', 'industry-trends', 'Latest developments in corporate gifting'),
('Sustainability', 'sustainability', 'Eco-friendly gifting options'),
('Human Resources', 'human-resources', 'HR-focused gifting strategies'),
('Customization', 'customization', 'Personalized corporate gift ideas'),
('International Business', 'international-business', 'Global corporate gifting practices'),
('Design', 'design', 'Gift design and packaging insights')
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs
DO $$
DECLARE
  industry_trends_id INTEGER;
  sustainability_id INTEGER;
  human_resources_id INTEGER;
  customization_id INTEGER;
  international_business_id INTEGER;
  design_id INTEGER;
BEGIN
  SELECT id INTO industry_trends_id FROM blog_categories WHERE slug = 'industry-trends';
  SELECT id INTO sustainability_id FROM blog_categories WHERE slug = 'sustainability';
  SELECT id INTO human_resources_id FROM blog_categories WHERE slug = 'human-resources';
  SELECT id INTO customization_id FROM blog_categories WHERE slug = 'customization';
  SELECT id INTO international_business_id FROM blog_categories WHERE slug = 'international-business';
  SELECT id INTO design_id FROM blog_categories WHERE slug = 'design';
  
  -- Insert sample blog posts
  INSERT INTO blog_posts (
    title, 
    slug, 
    excerpt, 
    content, 
    cover_image, 
    author, 
    author_image, 
    published_at, 
    category_id, 
    reading_time
  )
  VALUES
  (
    'Corporate Gifting Trends for 2024',
    'corporate-gifting-trends-2024',
    'Discover the latest trends in corporate gifting that are making waves in the business world this year.',
    '<p>The corporate gifting landscape is continuously evolving, with 2024 bringing new innovations and approaches to how businesses express appreciation to clients, partners, and employees.</p><h2>Personalization Takes Center Stage</h2><p>Gone are the days of generic corporate gifts. Companies are now investing in deeply personalized experiences, utilizing data and preferences to create gifts that resonate on an individual level. From custom engraving to personalized product selections based on recipient preferences, the one-size-fits-all approach is becoming obsolete.</p><h2>Sustainability as a Core Value</h2><p>Environmental consciousness continues to grow in importance, with eco-friendly gifts becoming a statement of corporate values. Biodegradable materials, zero-waste packaging, and products from companies with strong environmental credentials are increasingly sought after.</p><h2>Experiential Gifting</h2><p>Physical products are being complemented or replaced by memorable experiences. From virtual cooking classes to wellness subscriptions, companies are finding that gifting experiences creates lasting impressions and fosters deeper connections.</p><h2>Technology Integration</h2><p>Smart devices and tech-enhanced traditional items are becoming popular choices. QR codes linking to personalized messages, augmented reality experiences tied to physical gifts, and other technology integrations are adding new dimensions to corporate gifting.</p><h2>Local and Artisanal Focus</h2><p>Supporting local economies and artisans resonates with recipients who value authenticity and craftsmanship. Handcrafted items with stories behind them create meaningful connections and demonstrate thoughtful selection.</p>',
    '/blog/corporate-gifting-trends.jpg',
    'Sarah Johnson',
    '/blog/authors/sarah.jpg',
    '2024-03-15',
    industry_trends_id,
    '5 min read'
  ),
  (
    'Sustainable Corporate Gifts: A Guide for Eco-Conscious Businesses',
    'sustainable-corporate-gifts-guide',
    'Learn how sustainable gifting options can boost your company's environmental credentials while impressing clients.',
    '<p>As environmental awareness continues to grow, many businesses are reconsidering their corporate gifting strategies to align with sustainability goals and values.</p><h2>Benefits of Sustainable Corporate Gifting</h2><p>Adopting eco-friendly gifting practices offers multiple advantages beyond environmental impact. These gifts reflect positively on your brand's values, resonate with like-minded clients and partners, and often provide a unique, memorable experience that stands out from conventional corporate gifts.</p><h2>Materials to Look For</h2><p>When selecting sustainable gifts, prioritize items made from recycled, recyclable, or biodegradable materials. Bamboo, organic cotton, recycled glass, and reclaimed wood are excellent options that combine eco-friendliness with aesthetic appeal.</p><h2>Packaging Considerations</h2><p>The presentation of a gift matters almost as much as the gift itself. Opt for minimal packaging using recycled or biodegradable materials. Seed paper that can be planted, reusable cloth wrapping inspired by Japanese Furoshiki, or boxes made from post-consumer waste can all enhance the sustainability story of your gift.</p><h2>Gift Ideas That Make an Impact</h2><p>Consider gifts that continue giving beyond their initial receipt. Plant kits, tree-planting certificates, or donations to environmental causes in the recipient's name can create lasting positive impressions. Reusable items that replace single-use products, such as premium water bottles, travel utensil sets, or high-quality tote bags, combine practicality with purpose.</p>',
    '/blog/sustainable-gifts.jpg',
    'Michael Chen',
    '/blog/authors/michael.jpg',
    '2024-02-28',
    sustainability_id,
    '7 min read'
  ),
  (
    'How Executive Welcome Kits Boost Employee Retention',
    'executive-welcome-kits-retention',
    'Research shows that thoughtful onboarding gifts can significantly improve executive retention rates.',
    '<p>The first impression a company makes on a new executive can set the tone for their entire tenure. Well-crafted welcome kits have emerged as a powerful tool in building loyalty from day one.</p><h2>The Psychology Behind Welcome Gifts</h2><p>Research in organizational psychology suggests that meaningful welcome gifts trigger reciprocity and establish emotional connections early in the employment relationship. When executives receive thoughtfully curated welcome packages, they experience a sense of belonging and value that translates into stronger organizational commitment.</p><h2>Components of Effective Executive Welcome Kits</h2><p>The most impactful welcome kits combine practical tools for success with personalized touches that demonstrate attention to detail. High-quality technology accessories, premium stationery, company-branded items of genuine quality, and personalized notes from leadership create a multifaceted impression of care and professionalism.</p><h2>Measuring the Impact</h2><p>Companies implementing sophisticated executive welcome programs report significant improvements in key metrics. Studies show up to 30% higher retention rates in the crucial first year of employment when comprehensive welcome strategies including premium gift packages are employed.</p><h2>Beyond Material Gifts</h2><p>While physical gifts create immediate impact, pairing them with experiential elements elevates their effectiveness. Consider including invitations to exclusive events, memberships to professional organizations, or access to executive development resources as part of a complete welcome strategy.</p>',
    '/blog/executive-welcome-kits.jpg',
    'Amanda Rodriguez',
    '/blog/authors/amanda.jpg',
    '2024-01-18',
    human_resources_id,
    '6 min read'
  ),
  (
    'Personalization: The Key to Memorable Corporate Gifts',
    'personalization-memorable-corporate-gifts',
    'Explore how customization transforms ordinary items into extraordinary corporate gifts that recipients cherish.',
    '<p>In today's competitive business environment, generic corporate gifts often fail to make lasting impressions. Personalization has become the defining factor that transforms ordinary items into meaningful tokens of appreciation.</p><h2>Beyond Basic Branding</h2><p>True personalization extends beyond simply adding a company logo. The most effective personalized gifts consider the recipient's individual preferences, professional achievements, or personal milestones. This level of customization demonstrates attentiveness and genuine appreciation.</p><h2>Technology-Enabled Personalization</h2><p>Advances in production technology have made sophisticated personalization more accessible than ever. Laser engraving, 3D printing, digital printing on diverse materials, and custom packaging solutions allow for unprecedented levels of customization without prohibitive costs or minimum order requirements.</p><h2>Emotional Impact of Personalized Gifts</h2><p>Research consistently shows that personalized gifts create stronger emotional connections than their generic counterparts. Recipients of personalized items report higher levels of brand recall, stronger feelings of appreciation, and greater likelihood of maintaining business relationships with the gifting company.</p><h2>Balancing Personal and Professional</h2><p>The most successful personalized corporate gifts strike a delicate balance between professional relevance and personal thoughtfulness. While maintaining appropriate business context, these gifts incorporate elements that acknowledge the recipient as an individual with unique tastes and interests.</p>',
    '/blog/personalization.jpg',
    'David Thompson',
    '/blog/authors/david.jpg',
    '2024-01-05',
    customization_id,
    '4 min read'
  ),
  (
    'Corporate Gift Etiquette Around the World',
    'corporate-gift-etiquette-global',
    'Navigate cultural nuances in international business gifting with our comprehensive guide.',
    '<p>In global business, understanding the cultural nuances of gift-giving can be as important as the negotiations themselves. What's appropriate in one country may be offensive in another.</p><h2>East Asian Considerations</h2><p>In countries like Japan, China, and South Korea, gift presentation is often as important as the gift itself. Elaborate wrapping, proper presentation with both hands, and numerical considerations (avoiding the number 4 in China and Japan due to its association with death) are essential. Corporate gifts should reflect respect for hierarchy and tradition.</p><h2>Middle Eastern Practices</h2><p>When conducting business in Middle Eastern countries, be mindful that gifts should be given with the right hand or both hands, never the left alone. Avoid alcohol-related gifts in predominantly Muslim countries. Luxurious items are appreciated, but overly lavish gifts may create uncomfortable obligations.</p><h2>European Variations</h2><p>European gift-giving practices vary significantly by country. In France, high-quality cultural items reflecting sophistication are well-received. German business culture prefers practical, high-quality gifts without excessive showiness. In Mediterranean countries, gifts that celebrate local craftsmanship and culture are particularly appreciated.</p><h2>North American Approaches</h2><p>In the United States and Canada, corporate gifting typically emphasizes practicality and appropriateness to the business relationship. Transparency is crucial, with many companies having clear policies about gift values they can accept. Gifts that can be shared among team members are often well-received.</p><h2>Latin American Traditions</h2><p>In many Latin American countries, business relationships are built on personal connections. Gifts that acknowledge family or personal interests can strengthen these bonds. Quality is valued over quantity, and gifts from your home country that represent your culture are often appreciated.</p>',
    '/blog/global-gift-etiquette.jpg',
    'Elena Kowalski',
    '/blog/authors/elena.jpg',
    '2023-12-12',
    international_business_id,
    '8 min read'
  ),
  (
    'Premium Packaging: Elevating the Gift Experience',
    'premium-packaging-gift-experience',
    'Discover how sophisticated packaging can transform the entire gifting experience for your clients and partners.',
    '<p>The power of first impressions cannot be overstated in corporate gifting. Premium packaging serves as the crucial first touchpoint that sets expectations and enhances perceived value.</p><h2>The Psychology of Packaging</h2><p>Research in consumer psychology consistently demonstrates that packaging significantly influences how recipients perceive the quality of the enclosed gift. Unboxing experiences that engage multiple senses create stronger emotional connections and more memorable impressions than the gift item alone might generate.</p><h2>Materials That Communicate Quality</h2><p>The tactile quality of packaging materials sends immediate signals about the thought invested in the gift. Textured papers, responsibly sourced hardwoods, recycled but premium-finish cardboards, and natural fabrics all convey care and quality through touch. Subtle details like embossing, foil stamping, or custom closures further enhance the luxury experience.</p><h2>Sustainable Luxury</h2><p>Modern premium packaging successfully balances opulence with environmental responsibility. Reusable packaging elements, biodegradable materials with luxury finishes, and packaging that transforms into useful objects represent the cutting edge of sophisticated corporate gift presentation.</p><h2>Personalization Through Packaging</h2><p>Customization opportunities extend beyond the gift itself to its presentation. Packaging that incorporates the recipient's name, features relevant imagery, or tells a story connected to your business relationship transforms the unboxing into a deeply personal experience.</p><h2>Creating Multi-Stage Reveals</h2><p>The most memorable packaging designs build anticipation through layered reveals. Like chapters in a story, each layer unveiled brings the recipient closer to the gift while building emotional investment in the experience. This approach transforms a simple exchange into a meaningful ritual.</p>',
    '/blog/premium-packaging.jpg',
    'Robert Kim',
    '/blog/authors/robert.jpg',
    '2023-11-22',
    design_id,
    '5 min read'
  )
  ON CONFLICT (slug) DO NOTHING;
END $$; 