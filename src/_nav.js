export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: ""
      }
    },
    {
      title: true,
      name: "",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Send SMS",
      url: "/sendsms",
      icon: "icon-envelope"
    },
    {
      name: "Charts",
      url: "/dashboard",
      icon: "icon-graph"
    }
  ]
};
