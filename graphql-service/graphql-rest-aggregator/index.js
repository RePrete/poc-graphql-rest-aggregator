const axios = require("axios");
const config = require('config');

const schemaConfig = config.get("schema");
const dataLoaders = {};

class DataLoader {
  constructor() {
    this.cache = {}
  }
  get(k) {
    return this.cache[k] ?? null
  }
  set(k, v) {
    this.cache[k] = v
  }
}


function getPropertyConfig(info) {
  const propertyConfig = schemaConfig.find((type) => {
    return type.type == info.parentType

  });

  if (!propertyConfig) {
    console.error("Schema type config not found", {
      parentType: info.parentType,
      returnType: info.returnType
    })
    return null;
  }
  const result = propertyConfig.mapped_properties.find((property) => property.type ==  info.returnType)
  if (!result) {
    console.error("property config not found", {
      parentType: info.parentType,
      returnType: info.returnType
    })
    return null;
  }
  return result
}

async function requestMappedData(url, params) {
  if (!(url in dataLoaders)) {
    dataLoaders[url] = new DataLoader()
  }
  const loader = dataLoaders[url];
  let key = Object.values(params)[0];
  let result = loader.get(key)
  if (!result) {
    const response = axios.get(
      url,
      {
        params: params
      }
    )
    result = (await response).data.result
    loader.set(key, result)
  }

  return result;
}

const blueprintResolverCallback = async (parent, _args, _context, info) => {
  let foundConfig = getPropertyConfig(info);
  if (!foundConfig) {
    return null;
  }

  if (!parent[foundConfig.parent_property]) {
    console.debug("parent_property does not exist on parent", {
      parent_property: foundConfig.parent_property
    })
    return null;
  }
  const valueToSearch = parent[foundConfig.parent_property];
  const params = {};
  params[foundConfig.resolver.search_by] = valueToSearch;

  const url = foundConfig.resolver.url;
  const result = await requestMappedData(url, params);
  if (result.length === 0) {
    return null
  }

  return result.find((data) => {
    return data[foundConfig.resolver.search_by] === valueToSearch
  });
}

exports.getQueries = function() {
  const entities = {}
  schemaConfig.forEach(entity => {
    const entityDefinition = {};
    entity.mapped_properties.forEach((property) => {
      entityDefinition[property.type.toLowerCase()] = blueprintResolverCallback
    });
    entities[entity.type] = entityDefinition;
  });
  return entities
}