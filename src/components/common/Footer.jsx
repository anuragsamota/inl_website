import React, { useState, useEffect, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Mail, BookOpen } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import { getLabInfo } from '../../services/api';

const Footer = memo(function Footer() {
  const [labInfo, setLabInfo] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadInfo() {
      const info = await getLabInfo();
      if (isMounted) setLabInfo(info);
    }
    loadInfo();
    return () => { isMounted = false; };
  }, []);

  if (!labInfo) return null;

  return (
    <footer className="footer p-10 bg-base-200 h-full text-base-content border-t border-base-300 mt-20 text-xsgrid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 grid">
      
      {/* Col 1: Lab info */}
      <aside className="space-y-2 max-w-sm">
        <div className="flex w-48 h-48 items-center gap-2 font-display font-bold text-base text-base-content max-w-sm">
          <svg class="fill-primary" version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="860.000000pt" height="860.000000pt" viewBox="0 0 860.000000 860.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,860.000000) scale(0.100000,-0.100000)"
                stroke="none">
                <path d="M4200 8343 c-82 -6 -210 -34 -283 -60 -406 -145 -718 -522 -753 -907
-4 -50 -12 -80 -23 -90 -9 -8 -74 -40 -146 -71 -444 -193 -786 -475 -1086
-896 -201 -281 -382 -641 -463 -922 -42 -145 -59 -261 -60 -412 -1 -121 2
-145 19 -180 38 -77 100 -55 152 54 40 87 157 292 238 420 285 450 731 911
1158 1199 128 86 318 182 361 182 23 0 41 -13 90 -67 207 -232 383 -349 615
-410 81 -22 119 -26 246 -27 167 -1 243 10 375 57 165 57 296 141 418 266 387
398 429 1023 98 1461 -137 182 -345 313 -589 370 -77 18 -269 42 -306 38 -9
-1 -36 -3 -61 -5z"/>
                <path d="M5607 7217 c-10 -226 -44 -370 -137 -563 -77 -163 -198 -327 -317
-431 -74 -64 -207 -160 -233 -168 -29 -9 -24 -25 8 -25 53 0 240 -49 343 -89
373 -146 684 -446 875 -846 72 -149 109 -252 154 -431 130 -507 130 -1125 -2
-1769 -23 -110 -43 -213 -46 -230 l-5 -30 20 25 c77 97 273 463 366 685 152
360 256 724 306 1070 113 773 -38 1481 -445 2090 -114 172 -194 267 -368 440
-147 147 -327 294 -472 387 l-41 26 -6 -141z"/>
                <path d="M4460 5799 c-439 -51 -752 -118 -1090 -234 -654 -224 -1401 -646
-1950 -1100 -132 -109 -361 -341 -457 -461 -293 -370 -446 -731 -480 -1129
l-6 -79 25 19 c157 122 237 170 374 224 157 62 280 85 459 85 195 0 332 -29
528 -109 15 -7 17 2 17 91 1 469 386 1000 1200 1653 478 385 1050 785 1413
990 31 18 57 39 57 47 0 8 -3 13 -7 13 -5 -1 -42 -5 -83 -10z"/>
                <path d="M7202 4618 c-20 -20 -14 -71 19 -149 229 -554 277 -1114 134 -1567
-14 -46 -34 -91 -44 -101 -13 -13 -41 -19 -112 -24 -175 -12 -333 -69 -495
-178 -285 -192 -465 -536 -464 -889 2 -386 220 -730 575 -906 249 -123 512
-151 775 -84 492 126 844 596 817 1089 -13 236 -115 479 -275 659 -90 100 -85
84 -57 208 61 275 59 531 -6 834 -48 217 -153 458 -276 630 -117 163 -324 357
-489 459 -55 33 -83 38 -102 19z"/>
                <path d="M1195 2904 c-260 -40 -442 -121 -625 -278 -100 -86 -216 -238 -282
-371 -99 -197 -119 -364 -73 -612 35 -189 73 -294 146 -402 171 -256 445 -434
742 -481 121 -20 329 -8 452 25 166 45 150 47 257 -38 499 -402 1100 -565
1693 -462 263 46 599 172 635 238 14 26 14 29 -7 46 -17 15 -49 19 -170 24
-536 24 -1037 214 -1332 506 -103 101 -162 182 -224 306 -80 159 -90 206 -92
465 -1 199 -4 233 -23 296 -110 366 -395 633 -762 715 -83 19 -276 32 -335 23z"/>
                <path d="M2536 2388 c171 -341 436 -688 748 -977 293 -273 672 -523 1031 -681
774 -340 1632 -392 2364 -142 l85 28 -81 44 c-380 202 -623 604 -623 1030 0
61 -2 110 -5 110 -3 0 -73 -34 -157 -75 -352 -172 -710 -246 -1128 -232 -196
7 -284 16 -480 53 -619 115 -1183 392 -1665 816 l-136 119 47 -93z"/>
              </g>
            </svg>
          <span>{labInfo.name}</span>
        </div>
        <p className="text-base-content/70 leading-relaxed">
          {labInfo.tagline}
        </p>
        <p className="text-base-content/50 pt-2 font-mono">
          © {new Date().getFullYear()} {labInfo.name}. All rights reserved.
        </p>
      </aside>

      {/* Col 2: Navigation */}
      <nav>
        <h6 className="footer-title text-xs">Navigation</h6>
        <NavLink to="/publications" className="link link-hover">Publications</NavLink>
        <NavLink to="/people" className="link link-hover">People & Directory</NavLink>
        <NavLink to="/news" className="link link-hover">News & Updates</NavLink>
        <NavLink to="/contact" className="link link-hover">Contact Us</NavLink>
      </nav>

      {/* Col 3: Location & Contact */}
      <nav>
        <h6 className="footer-title text-xs">Contact & Location</h6>
        <div className="flex items-start gap-2 text-base-content/70">
          <MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" />
          <span>
            {labInfo.location}<br />
            {labInfo.department && <span>{labInfo.department}<br /></span>}
            {labInfo.university && <span>{labInfo.university}<br /></span>}
            <span>{labInfo.address}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-base-content/70">
          <Mail className="w-4 h-4 shrink-0 text-primary" />
          <a href={`mailto:${labInfo.email}`} className="link link-hover">{labInfo.email}</a>
        </div>
      </nav>

      {/* Col 4: Profiles */}
      <nav>
        <h6 className="footer-title text-xs">Social Links</h6>
        <div className="flex items-center gap-3 pt-1">
          {labInfo.socials?.scholar && (
            <a 
              href={labInfo.socials.scholar} 
              target="_blank" 
              rel="noreferrer noopener" 
              className="btn btn-ghost btn-xs btn-square" 
              aria-label="Google Scholar"
            >
              <BookOpen className="w-4 h-4" />
            </a>
          )}
          {labInfo.socials?.github && (
            <a 
              href={labInfo.socials.github} 
              target="_blank" 
              rel="noreferrer noopener" 
              className="btn btn-ghost btn-xs btn-square" 
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
          )}
          {labInfo.socials?.linkedin && (
            <a 
              href={labInfo.socials.linkedin} 
              target="_blank" 
              rel="noreferrer noopener" 
              className="btn btn-ghost btn-xs btn-square" 
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </nav>

    </footer>
  );
});

export default Footer;
