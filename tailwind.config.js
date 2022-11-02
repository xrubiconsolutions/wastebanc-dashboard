module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        placeholder: "#D4D4D4",
        "placeholder-2": "#D5D5D5",
        "title-active": "#222D33",
        body: "#464F54",
        label: "#C2C2C2",
        line: "#D9DBE9",
        input: "#EFF0F6",
        primary: "#008300",
        secondary: "#005700",
        error: "#FE0110",
        success: "#00BA88",
        "bd-color": "#BDBDBD",
      },

      outline: {
        input: ["2px solid #005700", "1px"],
      },
      borderWidth: {
        5: "5px",
      },
      borderColor: {},
    },
  },
  plugins: [],
};
