
# YMLConfigr Package

A package that utilizes config.yml file for environment config that you can use (e.g. keeping keys and other environment variables)

Based on the example yaml file below, you will now keep your keys and environment variables in a separate file with the capabilities of a YAML file such as commenting and much more.

Example:
```yaml

defaults: &DEFAULT
  module_one_config: &module_one_config
    API_KEY: ''
    BASE_URL: ''
  module_two_config: &module_two_config
    API_KEY: ''
    BASE_URL: ''
  secret: ''

staging: &ENV1
  <<: *DEFAULT
  module_one_config: &env1_module_one_config
    <<: *module_one_config
  module_two_config: &env1_module_two_config
    <<: *module_two_config

production: &ENV2
  <<: *ENV1
  module_one_config:
    <<: *env1_module_one_config
  module_two_config:
    <<: *env1_module_two_config
```