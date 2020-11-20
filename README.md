# DA11-dashboard

![ESCAP-logo](https://www.unescap.org/themes/custom/escap2020/logo.png)
![Decade-of-ocean](https://www.unescap.org/sites/default/d8files/SDG_Decade_of_Action_E2x.png)

## Table of Contents

- [DA11-dashboard](#da11-dashboard)
	- [Table of Contents](#table-of-contents)
	- [Introduction](#introduction)
		- [Objective](#objective)
		- [Main data source](#main-data-source)
	- [Technical guide](#technical-guide)
		- [Main tools](#main-tools)
		- [Usage](#usage)
		- [Files & directories](#files--directories)
	- [Possible future work](#possible-future-work)
	- [Background material](#background-material)
	- [Contributor](#contributor)

## Introduction

### Objective

- Highlight the importance of the ocean/ocean economy/ocean ecosystem
- Show the comprehensiveness of ocean accounts (compared to system of national accounts)
- Explain how statistical harmonization based on ocean accounting can be presented

### Main data source

- Statistical data from the General Statistic Office of Viet Nam
- Remote sensing data
- Geospatial data from the pilot study

## Technical guide

### Main tools

- The dashboard is developed using [React](https://reactjs.org/) to compose different parts (variable select, map and bar plot).
- UI components are adapted from [Ant Design](https://ant.design/docs/react/introduce).
- The map part is developed by [Openlayer](https://openlayers.org/en/latest/doc/tutorials/).
- The bar plot is developed by [D3](https://d3js.org/).
- The dashboard design follows [UN Web Style Guide](https://www.un.org/styleguide/) by the The Department of Global Communications.

### Usage

We recommend using npm or yarn to Install/update local dependencies:

```
# npm
npm install

# yarn 
yarn install 
```

Test on local environment:

```
# npm
npm start

# yarn 
yarn start # visit http://localhost:8000
```

Build and deploy:

```
# npm
npm run build

# yarn 
yarn build
```

### Files & directories

```
--- build
--- node_modules
--- public	# logos, pictures geo-spatial data.
--- src
	--- charts
		--- Da11Map	# Map components
		--- DownChart # Bar chart
	--- da11Component
		--- Da11Down.js	# Make bar chart
		--- Da11Header.js	# Make Navbar
		--- Da11Left.js	# Make variable selector
		--- Da11Up.js	# Make Map 
		--- DaDrawer.js	# Make info Drawer
		--- DaMenu.js	# Automacticlly make menu by data(used by Da11Left.js)
	--- data	# Refer to data-format for automacticlly data load and visualization
	--- App.js	#compose dashboard and welcome page
	--- Dashboard.js	# Compose main component
	--- Welcome.js	# Make welcome page
	--- bgvideo.mp4 # Background video for welcome page
```

## Possible future work

- Add upload function
- Simplify data format and allow conversion from user-friendly format(.csv, .xls ect.) to json
- Add intereactive geo-data stylization

## Background material

[Global Dialogue on Ocean Accounting in Nov 2019](https://www.unescap.org/events/global-dialogue-ocean-accounting-and-first-annual-meeting-global-ocean-accounts-partnership)

## Contributor

MAO Qi([email](maoqi@pku.edu.cn) [github](https://github.com/qinterest))