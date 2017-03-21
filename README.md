# Grocery List

Stay within budget while shopping.

## Team

  - __Product Owner__: Elijah Schow
  - __Scrum Master__: Cory Grinstead
  - __Development Team Members__:
    - Burk McRae
    - Jonathan Granstaff

## Table of Contents

1. [Team](#team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Run Locally](#run-locally)
    1. [Deploy](#deploy)
1. [Contributing](#contributing)

## Usage

Tap the 'Add Item' button to add a blank 'item' line. Tap the trash can icon to delete any line. If there are multiple items in your list, you may drag and drop a list item to change the order simply by tapping and holding on the list item.

Tapping any field on the line item (either 'Item' or '$0') will allow you to update the field with either a name or a price. Hitting enter or tapping away from the field finalizes the entry. When you add a price, you should see the 'TOTAL' field (top right) update with the new total price. Tapping again on either field in the item line allows you to update that field.

Tap the 'BUDGET' field (top left) to enter a budget. The header color will now change as your TOTAL approaches and passes your BUDGET (blue -> yellow -> red). Changing BUDGET back to $0 turns this feature off.

## Requirements

- Node 5.xx.x +
- ReactJS
- Webpack
- (see `package.json` for details)

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Run Locally
```sh
npm run dev
```

NOTE: `npm run dev` will serve files at `http://localhost:8080/client/public/`, but `npm start` serves them at `http://localhost:8080/`.


### Deploy

Follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps) to configure your deployment server. When you're ready to deploy:

#### On your computer:

1. `git pull --rebase upstream master`
2. `git push live master`

#### On the server:

1. `npm install`
2. `webpack -p`
3. `pm2 start server/server.js`
    See [PM2's documentation](http://pm2.keymetrics.io/docs/usage/cluster-mode/) for additional commands

#### If you're having trouble:

1. **Location:** Before running `npm install` on the server, make sure that you go to the working directory. e.g. if the server file lives at `/var/grocerybag/server/server.js`, go to `/var/grocerybag/` in the terminal.
2. **Process Manager:** Make sure that PM2 is installed globally. If not, run:

    ```sh
    npm install pm2 -g
    ```

## Contributing

See [CONTRIBUTING.md](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md) for contribution guidelines.
