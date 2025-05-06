// scripts/templates/nav.js
// Export a template string containing the navbar, submenus, and extension container
export const navbarTemplate = (mode) => `
  <nav class="fixed w-full z-50 bg-transparent transition-all duration-300 ${
    mode === 'black' ? '!bg-black' : ''
  } !opacity-100" id="navbar">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-2">
        <div class="logo-container">
          <a href="/">
            <img src="images/foodlink_logo.png" alt="FoodLink Logo" class="h-10" fetchpriority="high" />
          </a>
        </div>
        <div class="hidden lg:flex space-x-8 nav-panel desktop-menus">
          <a href="/" class="text-white hover:text-[var(--golden)] transition-colors">Home</a>
          <a href="about.html" class="text-white hover:text-[var(--golden)] transition-colors" id="nav-about" data-has-submenu="true" data-submenu="about">About us</a>
          <a href="business-overview.html" class="text-white hover:text-[var(--golden)] transition-colors" id="nav-business" data-has-submenu="true" data-submenu="business">Business</a>
  
          <a href="community.html" class="text-white hover:text-[var(--golden)] transition-colors" id="nav-community" data-has-submenu="true" data-submenu="community">Community</a>
          <a href="newsroom.html" class="text-white hover:text-[var(--golden)] transition-colors" id="nav-newsroom" data-has-submenu="true" data-submenu="newsroom">Newsroom</a>
          <a href="careers.html" class="text-white hover:text-[var(--golden)] transition-colors" id="nav-careers" data-has-submenu="true" data-submenu="careers">Careers</a>
          <a href="contactus.html" class="text-white hover:text-[var(--golden)] transition-colors">Contact us</a>
        </div>
        <button class="lg:hidden text-white block" id="mobile-menu-button" aria-label="Toggle menu" aria-expanded="false">
          <div class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu-backdrop hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 opacity-0"></div>
    <div class="mobile-menu hidden lg:hidden bg-black fixed top-0 right-0 h-full w-4/5 max-w-sm py-4 pt-0 px-4 shadow-lg transform opacity-0 transition-all duration-500 z-50 overflow-y-auto text-white">
      <div class="flex items-center justify-between sticky top-0 z-50 bg-black px-2 pt-7 pb-5">
        <span class="text-[1.2rem] text-white">Menu</span>
        <div class="border-b z-20 border-[rgba(255,255,255,0.2)] absolute w-full left-- top-[100%] -translate-y-1"></div>
      </div>
      <div class="flex flex-col gap-1 mt-4">
        <a href="/" class="block py-2 px-2 text-lg font-normal hover:text-[var(--golden)]  transition-colors">Home</a>
        <button class="mobile-menu-toggle flex justify-between items-center w-full py-2 px-2 text-lg font-normal focus:outline-none" aria-expanded="false" data-target="mobile-submenu-about">
          <a href="about.html" class="inline-block font-normal hover:text-[var(--golden)]  transition-colors">About Us</a>
          <span class="chevron text-2xl font-normal ml-2">&#8250;</span>
        </button>
        <ul id="mobile-submenu-about" class="hidden pl-5 border-l border-gray-700 mb-1 py-3 pb-4">
          <div class="font-semibold text-base tracking-wide mb-2 capitalize">Foodlink Group</div>
          <li><a href="/about.html#conception" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Conception</a></li>
          <li><a href="/evolution.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Evolution</a></li>
          <li><a href="/footprints.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Footprint</a></li>
          <div class="font-semibold mb-4"></div>
          <li><a href="/about.html#vision-mission" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Vision & Mission</a></li>
          <li><a href="/value-framework.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Value Framework</a></li>
          <li><a href="/founder.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Founder</a></li>
          <div class="font-semibold mb-4"></div>
          <li><a href="/leadership.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Leadership</a></li>
          <li><a href="/infrastructure.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Infrastructure</a></li>
          <li><a href="/investors.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Investors</a></li>
        </ul>
        <button class="mobile-menu-toggle flex justify-between items-center w-full py-2 px-2 text-lg font-normal focus:outline-none" aria-expanded="false" data-target="mobile-submenu-business">
          <a href="business-overview.html" class="inline-block font-normal hover:text-[var(--golden)]  transition-colors">Business</a>
          <span class="chevron text-2xl font-normal ml-2">&#8250;</span>
        </button>
        <ul id="mobile-submenu-business" class="hidden pl-5 border-l border-gray-700 mb-1 pt-3 pb-4">
          <div class="text-xl tracking-wide mb-4 capitalize font-semibold"><a href="business-overview.html" class="inline-block font-normal hover:text-[var(--golden)]  transition-colors">Business Overview</a></div>
          <div class="font-semibold text-base tracking-wide mb-2 capitalize">Our Brands</div>
          <li><a href="/india-bistro.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">India Bistro</a></li>
          <li><a href="/china-bistro.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">China Bistro</a></li>
          <li><a href="/glocal.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Glocal</a></li>
          <li><a href="/art-of-dum.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Art of Dum</a></li>
          <div class="font-semibold text-base tracking-wide mt-8 mb-3 capitalize">Business Verticals</div>
          <li><a href="/luxury-event-catering.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Luxury Event Catering</a></li>
          <li><a href="/restaurant-and-cloud-kitchen.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Restaurants & Cloud Kitchens</a></li>
          <li><a href="/luxury-banquets-and-conventions.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Luxury Banquets & Conventions</a></li>
          <li><a href="/integrated-fnb-services.html" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Integrated F&B Services</a></li>
        </ul>
        <button class="mobile-menu-toggle flex justify-between items-center w-full py-2 px-2 text-lg font-normal focus:outline-none" aria-expanded="false" data-target="mobile-submenu-community">
          <a href="community.html" class="inline-block font-normal hover:text-[var(--golden)]  transition-colors">Community</a>
          <span class="chevron text-2xl font-normal ml-2">&#8250;</span>
        </button>
        <ul id="mobile-submenu-community" class="hidden pl-5 border-l border-gray-700 mb-1 pt-3 pb-4">
          <div class="text-lg tracking-wide mb-2 capitalize font-semibold">Our Promise</div>
          <li><a href="/community.html#our-assurance" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Our Assurance</a></li>
          <li><a href="/community.html#sustainibility" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Sustainability At Core</a></li>
          <li><a href="/community.html#social-responsibility" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Social Responsibility</a></li>
          <li><a href="/community.html#empowerment" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Empowerment</a></li>
        </ul>
        <button class="mobile-menu-toggle flex justify-between items-center w-full py-2 px-2 text-lg font-normal focus:outline-none" aria-expanded="false" data-target="mobile-submenu-newsroom">
          <a href="newsroom.html" class="inline-block font-normal hover:text-[var(--golden)]  transition-colors">Newsroom</a>
          <span class="chevron text-2xl font-normal ml-2">&#8250;</span>
        </button>
        <ul id="mobile-submenu-newsroom" class="hidden pl-5 border-l border-gray-700 mb-1 pt-3 pb-4">
          <li><a href="/newsroom.html#media-releases" class="block pt-1 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Media Releases</a></li>
          <li><a href="/newsroom.html#media-library" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Media Library</a></li>
          <li><a href="/newsroom.html#social-media" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Social Media</a></li>
        </ul>
        <button class="mobile-menu-toggle flex justify-between items-center w-full py-2 px-2 text-lg font-normal focus:outline-none" aria-expanded="false" data-target="mobile-submenu-careers">
          <a href="careers.html" class="inline-block font-normal hover:text-[var(--golden)]  transition-colors">Careers</a>
          <span class="chevron text-2xl font-normal ml-2">&#8250;</span>
        </button>
        <ul id="mobile-submenu-careers" class="hidden pl-5 border-l border-gray-700 mb-1 pt-3 pb-4">
          <li><a href="/careers.html#our-culture" class="block pt-1 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Work Culture</a></li>
          <li><a href="/careers.html#work-with-us" class="block py-2 pb-0 font-light hover:text-[var(--golden)]  transition-colors">Work With Us</a></li>
        </ul>
        <a href="/contactus.html" class="block py-2 px-2 text-lg font-normal hover:text-[var(--golden)]  transition-colors">Contact Us</a>
      </div>
    </div>
    <style>
      .mobile-menu::-webkit-scrollbar {
        width: 6px;
        background: #232323;
      }
      .mobile-menu::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 4px;
      }
      .mobile-menu {
        scrollbar-width: thin;
        scrollbar-color: #666 #232323;
      }
    </style>

    </div>

    
  </nav>

  <!-- Navbar extension: Black sliding section -->
  <div id="navbar-extension" class="fixed left-0 top-0 w-full h-0 bg-black z-40 transition-all duration-500 overflow-hidden pointer-events-none opacity-10" style="opacity:0.08;">
    <!-- Submenu for About Us -->
    <div id="submenu-about" class="hidden w-full h-full pt-10 pb-8 text-white flex flex-row">
      <div class="submenu-content-align pb-8">
        <div class="max-w-6xl mx-auto pb-8">
          <div class="text-2xl font-extrabold tracking-wider mb-12 capitalize"></div>
          <div class="grid grid-cols-3 gap-12">
            <div>
              <div class="font-semibold text-base tracking-wide mb-2 capitalize">Foodlink Group</div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                <li><a href="/about.html#conception" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Conception</a></li>
                <li><a href="/evolution.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Evolution</a></li>
                <li><a href="/footprints.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Footprint</a></li>
              </ul>
            </div>
            <div>
              <div class="font-semibold mb-2">&nbsp;</div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                <li><a href="/about.html#vision-mission" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Vision & Mission</a></li>
                <li><a href="/value-framework.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Value Framework</a></li>
                <li><a href="/founder.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Founder</a></li>
              </ul>
            </div>
            <div>
              <div class="font-semibold mb-2">&nbsp;</div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                <li><a href="/leadership.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Leadership</a></li>
                <li><a href="/infrastructure.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Infrastructure</a></li>
                <li><a href="/investors.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Investors</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-8">
            <div class="font-semibold text-base tracking-wide mb-2 capitalize">Investors</div>
            <div class="grid grid-cols-3 gap-12 text-sm">
              <div>
                <div class="capitalize hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Test</div><div class="capitalize hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Test</div>
              </div>
              <div>
                <div class="capitalize hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Test</div><div class="capitalize hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Test</div>
              </div>
              <div>
                <div class="capitalize hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Test</div><div class="capitalize hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Test</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Submenu for Business -->
    <div id="submenu-business" class="hidden w-full h-full pt-10 pb-8 text-white flex flex-row">
      <div class="submenu-content-align pb-8">
        <div class="max-w-6xl mx-auto pb-8">
          <div class="text-2xl font-extrabold tracking-wider mb-12 capitalize"></div>
          <div class="text-lg tracking-wide mb-6 capitalize relative font-medium"> <a href="/business-overview.html" class="hover:text-[var(--golden)]">Business Overview </a><div class="h-[0.1px] absolute w-[120%] left-0 top-[100%] bg-gray-200 opacity-50 rounded mt-1 mb-4"></div></div>
          <div class="grid grid-cols-2 gap-16 mb-6">
            <div>
              <div class="font-semibold text-base tracking-wide mb-2 capitalize">Our Brands</div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                <li><a href="/india-bistro.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">India Bistro</a></li>
                <li><a href="/china-bistro.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">China Bistro</a></li>
                
              </ul>
            </div>
            <div>
              <div class="font-semibold mb-2">&nbsp;</div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                <li><a href="/glocal.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Glocal</a></li>
                <li><a href="/art-of-dum.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Art of Dum</a></li>
              </ul>
            </div>
          </div>
          <div class="font-semibold text-base tracking-wide mb-2 capitalize">Business Verticals</div>
          <div class="grid grid-cols-2 gap-16 text-sm font-lighter">
            <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
  <li>
    <a href="/luxury-event-catering.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">
      Luxury Event Catering
    </a>
  </li>
  <li>
    <a href="/luxury-banquets-and-conventions.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">
      Luxury Banquets & Conventions
    </a>
  </li>
</ul>
<ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
  <li>
    <a href="/restaurant-and-cloud-kitchen.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">
      Restaurants & Cloud Kitchens
    </a>
  </li>
  <li>
    <a href="/integrated-fnb-services.html" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">
      Integrated F&amp;B Services
    </a>
  </li>
</ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Submenu for Community -->
    <div id="submenu-community" class="hidden w-full h-full pt-10 pb-8 text-white flex flex-row">
      <div class="submenu-content-align pb-8">
        <div class="max-w-6xl mx-auto pb-8">
          <div class="text-2xl font-extrabold tracking-wider mb-12 capitalize"></div>
          <div class="text-lg tracking-wide mb-6 capitalize relative font-medium">Our Promise <div class="h-[0.1px] absolute w-[120%] left-0 top-[100%] bg-gray-200 opacity-50 rounded mt-1 mb-4"></div></div>
          <div class="grid grid-cols-2 gap-16 mb-6">
            <div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                 <li><a href="/community.html#our-assurance" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Our Assurance</a></li>
                <li><a href="/community.html#social-responsibility" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Social Responsibility</a></li>
              </ul>
            </div>
            <div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                <li><a href="/community.html#sustainibility" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Sustainability At Core</a></li>
                <li><a href="/community.html#empowerment" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Empowerment</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Submenu for Newsroom -->
    <div id="submenu-newsroom" class="hidden w-full h-full pt-10 pb-8 text-white flex flex-row">
      <div class="submenu-content-align pb-8">
        <div class="max-w-6xl mx-auto pb-8">
          <div class="text-2xl font-extrabold tracking-wider mb-12 capitalize"></div>
          
          <div class="grid grid-cols-2 gap-16 mb-6">
            <div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                <li><a href="/newsroom.html#media-release" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Media Releases</a></li>
                <li><a href="/newsroom.html#media-library" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Media Library</a></li>
                <li><a href="/newsroom.html#social-media" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Social Media</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Submenu for Careers -->
    <div id="submenu-careers" class="hidden w-full h-full pt-10 pb-8 text-white flex flex-row">
      <div class="submenu-content-align pb-8">
        <div class="max-w-6xl mx-auto pb-8">
          <div class="text-2xl font-extrabold tracking-wider mb-12 capitalize"></div>
          
          <div class="grid grid-cols-2 gap-16 mb-6">
            <div>
              <ul class="space-y-1 text-sm font-light tracking-wide capitalize text-gray-200">
                <li><a href="/careers.html#our-culture" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Work Culture</a></li>
                <li><a href="/careers.html#work-with-us" class="hover:underline underline-offset-4 decoration-[var(--golden)] cursor-pointer">Work With Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
`;
