# ![favicon](static/favicon.png) Pokémon Pokédex Application

This is a web-based Pokédex application that allows Pokémon Trainers to track their journey to becoming Pokémon Masters. Trainers can view detailed information for The Originals (the first 150 Pokémons), filter and sort them, and even export their personal Pokédex to a CSV file. This application was build with SvelteKit v5.

### Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installing and Running Locally](#installing--running-locally)
5. [Decision-Making Process](#decision-making-process)

## About the Project

With the rise of Pokémon GO, many trainers yearned for a better way to track and master the Pokémon they collect. This Pokédex allows trainers to view Pokémon information, analyze stats, and organize their own custom Pokédex.

**Requirements:**

- Display the first 150 Pokémon with their names and images.
- Allow users to view Pokémon details: height, weight, hp, speed, attack, defense, special attack, special defense and types.
- Let users share any Pokémon.
- Enable users to filter and sort Pokémon.
- Export the Pokédex as a CSV.

## Features

- **Pokémon List**: View a list of the original 150 Pokémon, complete with names, images and types.
- **Search Pokémon**: Search Pokémon by name.
- **Filter**: Filter Pokémon by height, weight, hp and type.
- **Sort**: Sort Pokémon by name, height, weight and hp.
- **CSV Export**: Export the Pokédex as a CSV file for offline use.
- **Share**: Share a Pokémon with friends.
- **Pokémon Detail Page**: Click on a Pokémon to see its height, weight, stats (hp, speed, attack, etc.), and types.
- Additionally &#8594; **Favorites**: Heart a Pokémon to add it to a list of favorites.

## Tech Stack

- **Language:** Typescript
- **Framework:** SvelteKit
- **API:** [PokéAPI](https://pokeapi.co)
- **Tools:** Vite, SvelteKit CLI
- **Libraries:** [Lucide](https://lucide.dev/) and [Papa Parse](https://www.papaparse.com/)

## Installing & Running Locally

**I used:**

- Node.js v20
- npm v10

### Steps

**1 - Clone the Repository**

```bash
git clone
cd
```

**2 - Install Dependencies**

```bash
npm install
```

**3 - Run the Development Server**

```bash
npm run dev
```

The app should be live at `http://localhost:5173/`

## Decision-Making Process

**Routes**
The application has 4 main routes:

1. `/`
   I envision that, as this application would grow, the root page would serve as a "landing page" that guides users through the website. Because of this, I decided to keep it "empty" and simply redirect to the "main" focus of the website for now (the Pokémon list).
2. `/pokemon`
   This is the main page for the website, which contains the list of the 150 original Pokémons. While searching, filtering and sorting, parameters are added as a query string. This is useful for keeping internal state to a minimum.
3. `/pokemon/[id]`
   Here, `id` represents a Pokémon id, which the PokéAPI provides directly, allowing for easier data fetching and navigation.
4. `/favorites`
   An additional page, that allows users to view a list of their favorite Pokémons.

**Modularization**
- To ensure the codebase is maintainable and easily expanded, I stored what are (or could become) reusable components in their own directory. They can easily be accessed through the `$lib` alias.

- With more time to explore SvelteKit specificities, I would have liked to increase the modularization of the codebase even further. For example, API calls could be stored in their own directory and the components that need to could interact with it through `$lib`.

**Functional Programming**
- Whenever is made sense and was possible, I tried to adhere to principles of functional programming, for example through the use of pure functions and immutability, to avoid the problems that come with shared state, mutable data and side effects.

**Data Fetching**
- I used SvelteKit's `load` functions to fetch Pokémon data and hydrate the page server-side. This approach allows for a faster initial load time and improves performance by offloading the initial rendering to the server.
- I made use of Typescript's type safety to verify that the data coming from the API conforms to the necessary information to render Pokémon data.

- Due to time constraints, I opted to immediately fetch all Pokémons and render all of them in the list. Since 150 Pokémons is a relatively small list, this choice is reasonable for the scope of this project. However, imagining that the application could grow to show all Pokémons for every single generation, loading all the data at once isn't ideal. Preferably, a feature like pagination or infinite-scrolling would decrease initial load time, and be a significant improvement to the application.

**Sharing Pokémon**
- I made use of the Web Share API to allow users to share a Pokémon using their operating systems mechanisms. This API is very simple to use but has limited browser compatibility (if you have problems with Firefox on desktop, please try Chrome or Safari). For the scope of this project, I opted for this API, but for other purposes it would be wise to look for another way to share data that has wider browser support.

**CSV Export**
- For simplicity, I opted to generate the CSV text using the Papa Parse library and used the native Javascript Blob API to create the CSV file.

- In the interaction between filtering/sorting and exporting to CSV, I decided that clicking the export button outputs the currently visible Pokémons (the ones that match the filtering/sorting options). In the future, it would be nice to provide the ability to choose between downloading all Pokémons or only the currently visible ones.

**Favorites**
- As a bonus, I opted to add the functionality of favoriting a Pokémon and being able to see a list of all favorite Pokémons. This would improve engagement and allow users to craft custom lists that can also be exported to CSV for future reference.
Due to time constraints, I achieved this through the use of cookies. For future reference, I would prefer to opt for other types of storage, like local storage, session storage or a database (if user accounts were to be added to the application).

- Due to my unfamiliarity with SvelteKit, when updating a cookie the components that make use of it did not automatically have access to the updated value, a reload was necessary. To fix this, I temporarily decided to redirect the user to the Favorites List page after they add a new favorite. With more time I would have found a way to ensure the component updated when it needed to.

**Design**
- My goal was to keep a clean, user-friendly design. I looked out for contrast levels to maintain a good level of readibility, while also using colors when they made sense (for example, to distinguish between Pokémon types, or in the visualization of the Hp level in the bar).
- I focused on a desktop/tablet-first design, since I imagined most Pokémon trainers would prefer to access this information on a wider screen. However, I also tried to make sure the design was responsive and accommodated mobile users.
- The Lucide icon library was used to polish the design.
- Code-wise, with more time I would have liked to clean up the CSS to reduce repetition and improve clarity.

**SEO & Accessibility**
- I made sure to use HTML semantic elements as much as possible, to increase the application's accessibility and SEO.

## Future Additions

- **Pokémon Evolutions**: Show the evolution chain for each Pokémon in their details page.
- **Pokémon Battle**: Choose 2 different Pokémons and compare their stats visually.
- **Light and Dark Modes**: Improve user experience by allowing them to customize the look of the website.
- **More Filter Options**: Filter Pokémons by abilities, moves, generations and evolution forms.
- **User Accounts**: Have user accounts to allow for personal Pokémon team building and saving, and tracking progress.
