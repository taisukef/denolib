const commandLineArgs = function (opt) {
  const options = {};
  options.def = opt;
  for (const o of opt) {
    if (o.defaultValue) {
      options[o.name] = o.defaultValue;
    }
    for (let i = 0; i < Deno.args.length; i++) {
      const arg = Deno.args[i];
      if (arg === "--" + o.name || arg === "-" + o.alias) {
        if (o.type === Boolean) {
          options[o.name] = true;
        } else if (o.type === String) {
          options[o.name] = Deno.args[i + 1];
          i++;
        } else if (o.type === Number) {
          options[o.name] = parseInt(Deno.args[i + 1]);
        }
      }
    }
  }
  return options;
}

export { commandLineArgs };
