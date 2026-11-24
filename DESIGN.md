# Taymour Chalak — design direction

Purpose: let brands and creators see Taymour’s actual editing work and start a conversation on his existing Instagram profile. Content authority is the supplied Flask portfolio and its three linked reels. No unverified clients, results, testimonials or availability claims.

The signature is an interactive editing timeline connected to a layered stack of real reel covers. Avoid stock film imagery and generic agency cards. Use a quiet editorial rhythm around the timeline: oversized condensed headlines, a light staggered reel gallery, concise service rows and a full-width copper-orange contact panel.

Canonical visual tokens live in `static/style.css :root`: charcoal ink (#151515), copper-orange accent (#ef874f), neutral white (#f4f4f1), dark copper text (#8c3f1f) and a warm playhead highlight (#ffc29c). The dedicated focus color (#ca5b2b) contrasts with both dark and light surfaces. Barlow Condensed 800 owns display headings; DM Sans owns readable content. Fonts and Instagram cover files are local, with no third-party requests before a reel is opened.

Behavior: project preview selection uses semantic pressed buttons. Both hero and gallery project links open the same native dialog, with a persistent original Instagram link. Without JavaScript these remain real external links. Preserve normal scrolling, anchor URLs, visible focus, reduced motion, image geometry, and no horizontal overflow. Native dialog handles focus containment and Escape; closing releases the embed and restores focus.

Maintain the Flask route and deployment entry point. `content.json` is the single content source. Static output must be generated from the Flask view, never edited independently.

Client feedback: use an assertive studio palette; avoid lavender and violet tints, including backgrounds, borders, hover states and the favicon.
