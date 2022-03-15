//remember that this configuration is to set webpack, and webpack is only a developer dependency
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");//we require the html webpack plugin
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");//we require the html webpack plugin
  const CopyWebpackPlugin = require("copy-webpack-plugin");//we require the copy webpack plugin 
	const DotEnvWebpack = require("dotenv-webpack");
  
  //we export this object to compile it in terminal
  module.exports = {
    entry: "./src/index.js",//this is the connection point to link css to html
    output: {
      path : path.resolve(__dirname, "dist"),//the folder where we need to compile is __dirname+dist 
      filename : "[name].[contenthash].js",//the file where we need to compile is main.js
      assetModuleFilename : "assets/images/[hash][ext][query]"//the file where we need to compile is main.js
    },

		mode: "development",//we activate the development mode
    watch: true,
    resolve : {
      extensions: [".js"],//my config is js extension
      alias: {
        "@utils": path.resolve(__dirname,"src/utils/"),
        "@templates": path.resolve(__dirname,"src/templates/"),
        "@styles": path.resolve(__dirname,"src/styles/"), 
        "@images": path.resolve(__dirname,"src/assets/images/")
      }

    },
    module: { //you describe modules config 
      rules: [//you describe your rules to use webpack
        {
          test : /\.m?js$/,//you verify that you need js file extension
          exclude : /node_modules/,//dont use node_modules
          use : {
            loader: "babel-loader"//use this loader module
          }
        },
        {
          test : /\.(css|styl)$/i,//you verify that you need .css OR .styl file extension
          use : [MiniCssExtractPlugin.loader,
            "css-loader",
            "stylus-loader"
          ]
        },
        {
          test: /\.png/,//accept .png extension
          type: "asset/resource"
        },
        {
          /*test: /\.(woff|woff2)$/,//accept .woff2 OR .woff extension
          use: {
            loader: "url-loader",
           options: {
              limit: 10000,//size limit
              mimetype: "aplication/font-woff",//data type
              name: "[name].[contenthash].[ext]",//output name
              outputPath: "./assets/fonts/",//where it will be saved in final proyect
              publicPath: "./assets/fonts/",
              esModule: false,
            }
          }*/

          test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
            filename: "assets/fonts/[hash][ext]",
          },

        },
      ]
    },
    //plugin section
    plugins: [
      new HtmlWebpackPlugin({//an instance of our plugin
        inject: true,//injection in true
        template: "./public/index.html",//the path of the file that we will process
        filename: "./index.html"//this will be the name of the file in dist/ folder
      }),
      new MiniCssExtractPlugin({
        filename: "assets/[name].[contenthash].css" // these hashes are to avoid problems with cache memo
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname,"src","assets/images"),
            to: "assets/images"
          }
        ]
      }),
			new DotEnvWebpack(),//just make the instance in plugins section
    ]
	}
 
