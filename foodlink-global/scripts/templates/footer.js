// scripts/templates/footer.js
export const footerTemplate =()=>`    <footer
      class="container w-full bg-white border-t border-gray-200 pt-24 md:pt-10 pb-14 px-4 text-[13px]"
    >
      <div class="w-full flex flex-col md:flex-row gap-8">
        <!-- Left: Columns (all in one row, compact) -->
        <div
          class="flex-1 flex flex-col md:flex-row justify-between flex-wrap gap-6 md:gap-10"
        >
          <!-- About Us -->
          <div>
            <h4
              class="font-bold mb-1 text-xs md:text-sm"
              style="color: var(--dark-bg)"
            >
              About Us
            </h4>
            <ul class="text-gray-700 !space-y-[4px] mt-4">
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/about.html#conception" class="!text-[var(--dark-text)]">Conception</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/evolution.html" class="!text-[var(--dark-text)]">Our Evolution</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/our-footprints.html" class="!text-[var(--dark-text)]">Our Footprint</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/about.html#vision-mission" class="!text-[var(--dark-text)]">Vision & Mission</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/value-framework.html" class="!text-[var(--dark-text)]">Value Framework</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/our-founder.html" class="!text-[var(--dark-text)]">Our Founder</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/infrastructure.html" class="!text-[var(--dark-text)]">Infrastructure</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/community.html#our-assurance" class="!text-[var(--dark-text)]">Our Assurance</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/leadership.html" class="!text-[var(--dark-text)]">Leadership</a></li>
            </ul>
          </div>
          <!-- Business -->
          <div>
            <h4
              class="font-bold mb-1 text-xs md:text-sm"
              style="color: var(--dark-bg)"
            >
              Business
            </h4>
            <ul class="text-gray-700 !space-y-[4px] mt-4">
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/luxury-event-catering.html" class="!text-[var(--dark-text)]">Luxury Event Catering</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/luxury-banquets-and-conventions.html" class="!text-[var(--dark-text)]">Luxury Banquets and Conventions</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/restaurant-and-cloud-kitchen.html" class="!text-[var(--dark-text)]">Restaurants and Cloud Kitchens</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/integrated-fnb-services.html" class="!text-[var(--dark-text)]">Integrated F&amp;B Services</a></li>
            </ul>
          </div>
          <!-- Investor -->
          <div>
            <h4
              class="font-bold mb-1 text-xs md:text-sm"
              style="color: var(--dark-bg)"
            >
              Investor
            </h4>
            <ul class="text-gray-700 !space-y-[4px] mt-4">
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/our-investors.html" class="!text-[var(--dark-text)]">Our Investors</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/financials-results.html" class="!text-[var(--dark-text)]">Financials Results</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/policies-codes.html" class="!text-[var(--dark-text)]">Policies &amp; Codes</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/shareholding-patterns.html" class="!text-[var(--dark-text)]">Shareholding Patterns</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/stock-exchange-filings.html" class="!text-[var(--dark-text)]">Stock Exchange Filings</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/board-meetings.html" class="!text-[var(--dark-text)]">Board Meetings</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/general-meetings.html" class="!text-[var(--dark-text)]">General Meetings</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/annual-reports.html" class="!text-[var(--dark-text)]">Annual Reports</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/annual-return.html" class="!text-[var(--dark-text)]">Annual Return</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/ipo-documents.html" class="!text-[var(--dark-text)]">IPO Documents</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/board-of-directors.html" class="!text-[var(--dark-text)]">Board of Directors</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/investor-grievance.html" class="!text-[var(--dark-text)]">Investor Grievance</a></li>
            </ul>
          </div>
          <!-- Newsroom -->
          <div>
            <h4
              class="font-bold mb-1 text-xs md:text-sm"
              style="color: var(--dark-bg)"
            >
              Newsroom
            </h4>
            <ul class="text-gray-700 !space-y-[4px] mt-4">
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/newsroom.html#media-release" class="!text-[var(--dark-text)]">Media Releases</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/newsroom.html#social-media" class="!text-[var(--dark-text)]">Social Media</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/newsroom.html#media-library" class="!text-[var(--dark-text)]">Media Library</a></li>
            </ul>
          </div>
          <!-- Community (in same row) -->
          <div>
            <h4
              class="font-bold mb-1 text-xs md:text-sm"
              style="color: var(--dark-bg)"
            >
              Community
            </h4>
            <ul class="text-gray-700 !space-y-[4px] mt-4">
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/community.html#our-assurance" class="!text-[var(--dark-text)]">Our Assurance</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/community.html#social-responsibility" class="!text-[var(--dark-text)]">Social Responsibility</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/community.html#sustainibility" class="!text-[var(--dark-text)]">Food Safety</a></li>
              <li class="hover:underline underline-offset-4 cursor-pointer"><a href="/community.html#empowerment" class="!text-[var(--dark-text)]">Empowerment</a></li>
            </ul>
          </div>
        </div>
        <!-- Divider & Right -->
        <div
          class="flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-0"
        >
          <!-- Divider -->
          <div class="hidden md:block border-l border-gray-300 mx-8"></div>
          <!-- Right: Links, Social, Newsletter, Logo -->
          <div
            class="flex flex-col justify-between h-full min-w-[220px] w-full md:w-auto py-4 md:py-0 flex-1 md:max-w-xs"
          >
            <!-- Top: Links -->
            <div class="flex flex-col gap-1 mb-4 md:mb-8">
              <a
                href="/careers.html"
                class="font-bold text-xs md:text-sm text-[var(--dark-bg)]"
                >Careers</a
              >
              <a
                href="/contactus.html"
                class="font-bold text-xs md:text-sm text-[var(--dark-bg)]"
                >Contact Us</a
              >
              <a
                href="/privacy-policy.html"
                class="font-bold text-xs md:text-sm text-[var(--dark-bg)]"
                >Privacy Policy</a
              >
              <a
                href="/terms-conditions.html"
                class="font-bold text-xs md:text-sm text-[var(--dark-bg)]"
                >Terms & Conditions</a
              >
              <a
                href="/disclaimer.html"
                class="font-bold text-xs md:text-sm text-[var(--dark-bg)]"
                >Disclaimer</a
              >
              <a
                href="/cookies-policy.html"
                class="font-bold text-xs md:text-sm text-[var(--dark-bg)]"
                >Cookies Policy</a
              >
            </div>
            <!-- Center: Social & Newsletter -->
            <div class="flex flex-col gap-3 mb-4">
              <div class="flex items-center gap-4">
                <a href="#" aria-label="LinkedIn">
                  <i class="fa-brands fa-linkedin-in text-3xl"></i>
                </a>
                <a href="#" aria-label="YouTube">
                  <i class="fa-brands fa-youtube text-3xl"></i>
                </a>
              </div>
            </div>
            <!-- Bottom: Logo -->
            <div class="w-full flex justify-start mt-10 -ml-3.5">
              <img
                src="images/Home page/logos/food-link-big.png"
                alt="Food &amp; Link"
                class="h-12 md:h-14 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>`;
