# ESCAP Ocean Accounting Visualization Dashboard 

![ESCAP-logo](https://www.unescap.org/themes/custom/escap2020/logo.png)
![Decade-of-ocean](https://www.unescap.org/sites/default/d8files/SDG_Decade_of_Action_E2x.png)

This product provides an interactive visualization tool (dashboard) for harmonizing, structuring and displaying ocean-relevant data. The product is based on the principle that information is more powerful when it can be readily communicated between different audiences. To this end, ESCAP Statistics Division (ESCAP-SD) developed this web-based dashboard that is able to vsualize customized statistical and geospatial data using open-source development libraries. This product provides a starting point for aiding our understanding of the Ocean Accounting Framework according to the System of Environmental-Economic Accounting (SEEA).

## Table of Contents

- [ESCAP Ocean Accounting Visualization Dashboard](#escap-ocean-accounting-visualization-dashboard)
	- [Table of Contents](#table-of-contents)
	- [Technical guide](#technical-guide)
		- [Introduction](#introduction)
		- [Usage](#usage)
		- [Files & directories](#files--directories)
	- [Possible future work](#possible-future-work)
	- [Background material](#background-material)
	- [Contributor](#contributor)

## Technical guide

### Introduction

- The dashboard is developed using [React](https://reactjs.org/) to create interactive user interfaces.
- UI components are mainly adapted from [Ant Design](https://ant.design/docs/react/introduce).
- The mapping pane is developed by [Openlayer](https://openlayers.org/en/latest/doc/tutorials/).
- The temporal change pane (line/bar chart) is developed by [D3](https://d3js.org/).
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
--- node_modules
--- public
--- src
	--- dashboardCompoent
		--- dashboardCharts
			--- DifferenceChart # Plot data for the difference mode
			--- MapChart # Plot data for the mapping pane
			--- TimeseriesChart # Plot data for the time series mdoe
		--- DownChart # Bar chart

	--- DashboardDown.js # Integrate the time series and the difference mdoe
	--- DashboardDrawer.js # Make data description drawer
	--- DashboardHeader.js # Make header
	--- DashboardLeft.js # Make the indicator selector pane
	--- DashboardMenu.js # Generate compoents of the indicator selector pane by input data
	--- DashboardUp.js # Make the mapping pane

	--- App.js
	--- Welcome.js	# Make welcome page
	--- AweDashboard.js	# Make example dashboard page
	--- AweUpDashboard # Generate dashboard by uploaded data
	--- UploadData.js # Make data upload page
	--- bgvideo.mp4 # Background video for welcome page
```

## Possible future work

- Add upload function
- Simplify data format and allow conversion from user-friendly format(.csv, .xls ect.) to json
- Add intereactive geo-data stylization

## Background material

[Global Dialogue on Ocean Accounting in Nov 2019](https://www.unescap.org/events/global-dialogue-ocean-accounting-and-first-annual-meeting-global-ocean-accounts-partnership)

[Technical Guidance on Ocean Accounting](https://www.oceanaccounts.org/technical-guidance-on-ocean-accounting-2/)

## Contributor

- MAO Qi([email](maoqi@pku.edu.cn) [github](https://github.com/qinterest))
- Aahlaad Musunuru
- Ayodele Marshall