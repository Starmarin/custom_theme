These are the data objects for ejs 

`default.js` must be present and export an object

example useage in schema:
```{
  "type":      "select",
  "id":        "bg_color",
  "label":     "Background Color",
  "options": <%- uikit.backgroundOptions -%>,
  "default": "bg-brand-primary"
}```


NOTE: 
  - NOT live updating! Run `yarn start` or `yarn watch` after updating!