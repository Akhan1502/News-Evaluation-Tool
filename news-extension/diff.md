diff --git a/package-lock.json b/package-lock.json
index b1cf42a..2c5bfc2 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -8,8 +8,12 @@
       "name": "news-extension",
       "version": "0.0.0",
       "dependencies": {
+        "@radix-ui/react-accordion": "^1.2.2",
+        "@radix-ui/react-collapsible": "^1.1.2",
+        "@radix-ui/react-separator": "^1.1.1",
         "class-variance-authority": "^0.7.1",
         "clsx": "^2.1.1",
+        "lucide-react": "^0.474.0",
         "react": "^18.3.1",
         "react-dom": "^18.3.1",
         "tailwind-merge": "^2.6.0"
@@ -17,6 +21,7 @@
       "devDependencies": {
         "@crxjs/vite-plugin": "^2.0.0-beta.30",
         "@eslint/js": "^9.18.0",
+        "@shadcn/ui": "^0.0.4",
         "@types/node": "^22.10.10",
         "@types/react": "^18.3.18",
         "@types/react-dom": "^18.3.5",
@@ -1151,6 +1156,298 @@
         "node": ">=14"
       }
     },
+    "node_modules/@radix-ui/primitive": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/@radix-ui/primitive/-/primitive-1.1.1.tgz",
+      "integrity": "sha512-SJ31y+Q/zAyShtXJc8x83i9TYdbAfHZ++tUZnvjJJqFjzsdUnKsxPL6IEtBlxKkU7yzer//GQtZSV4GbldL3YA==",
+      "license": "MIT"
+    },
+    "node_modules/@radix-ui/react-accordion": {
+      "version": "1.2.2",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-accordion/-/react-accordion-1.2.2.tgz",
+      "integrity": "sha512-b1oh54x4DMCdGsB4/7ahiSrViXxaBwRPotiZNnYXjLha9vfuURSAZErki6qjDoSIV0eXx5v57XnTGVtGwnfp2g==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/primitive": "1.1.1",
+        "@radix-ui/react-collapsible": "1.1.2",
+        "@radix-ui/react-collection": "1.1.1",
+        "@radix-ui/react-compose-refs": "1.1.1",
+        "@radix-ui/react-context": "1.1.1",
+        "@radix-ui/react-direction": "1.1.0",
+        "@radix-ui/react-id": "1.1.0",
+        "@radix-ui/react-primitive": "2.0.1",
+        "@radix-ui/react-use-controllable-state": "1.1.0"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "@types/react-dom": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
+        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        },
+        "@types/react-dom": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-collapsible": {
+      "version": "1.1.2",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-collapsible/-/react-collapsible-1.1.2.tgz",
+      "integrity": "sha512-PliMB63vxz7vggcyq0IxNYk8vGDrLXVWw4+W4B8YnwI1s18x7YZYqlG9PLX7XxAJUi0g2DxP4XKJMFHh/iVh9A==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/primitive": "1.1.1",
+        "@radix-ui/react-compose-refs": "1.1.1",
+        "@radix-ui/react-context": "1.1.1",
+        "@radix-ui/react-id": "1.1.0",
+        "@radix-ui/react-presence": "1.1.2",
+        "@radix-ui/react-primitive": "2.0.1",
+        "@radix-ui/react-use-controllable-state": "1.1.0",
+        "@radix-ui/react-use-layout-effect": "1.1.0"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "@types/react-dom": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
+        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        },
+        "@types/react-dom": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-collection": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-collection/-/react-collection-1.1.1.tgz",
+      "integrity": "sha512-LwT3pSho9Dljg+wY2KN2mrrh6y3qELfftINERIzBUO9e0N+t0oMTyn3k9iv+ZqgrwGkRnLpNJrsMv9BZlt2yuA==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/react-compose-refs": "1.1.1",
+        "@radix-ui/react-context": "1.1.1",
+        "@radix-ui/react-primitive": "2.0.1",
+        "@radix-ui/react-slot": "1.1.1"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "@types/react-dom": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
+        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        },
+        "@types/react-dom": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-compose-refs": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.1.tgz",
+      "integrity": "sha512-Y9VzoRDSJtgFMUCoiZBDVo084VQ5hfpXxVE+NgkdNsjiDBByiImMZKKhxMwCbdHvhlENG6a833CbFkOQvTricw==",
+      "license": "MIT",
+      "peerDependencies": {
+        "@types/react": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-context": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.1.tgz",
+      "integrity": "sha512-UASk9zi+crv9WteK/NU4PLvOoL3OuE6BWVKNF6hPRBtYBDXQ2u5iu3O59zUlJiTVvkyuycnqrztsHVJwcK9K+Q==",
+      "license": "MIT",
+      "peerDependencies": {
+        "@types/react": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-direction": {
+      "version": "1.1.0",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-direction/-/react-direction-1.1.0.tgz",
+      "integrity": "sha512-BUuBvgThEiAXh2DWu93XsT+a3aWrGqolGlqqw5VU1kG7p/ZH2cuDlM1sRLNnY3QcBS69UIz2mcKhMxDsdewhjg==",
+      "license": "MIT",
+      "peerDependencies": {
+        "@types/react": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-id": {
+      "version": "1.1.0",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-id/-/react-id-1.1.0.tgz",
+      "integrity": "sha512-EJUrI8yYh7WOjNOqpoJaf1jlFIH2LvtgAl+YcFqNCa+4hj64ZXmPkAKOFs/ukjz3byN6bdb/AVUqHkI8/uWWMA==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/react-use-layout-effect": "1.1.0"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-presence": {
+      "version": "1.1.2",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-presence/-/react-presence-1.1.2.tgz",
+      "integrity": "sha512-18TFr80t5EVgL9x1SwF/YGtfG+l0BS0PRAlCWBDoBEiDQjeKgnNZRVJp/oVBl24sr3Gbfwc/Qpj4OcWTQMsAEg==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/react-compose-refs": "1.1.1",
+        "@radix-ui/react-use-layout-effect": "1.1.0"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "@types/react-dom": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
+        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        },
+        "@types/react-dom": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-primitive": {
+      "version": "2.0.1",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.0.1.tgz",
+      "integrity": "sha512-sHCWTtxwNn3L3fH8qAfnF3WbUZycW93SM1j3NFDzXBiz8D6F5UTTy8G1+WFEaiCdvCVRJWj6N2R4Xq6HdiHmDg==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/react-slot": "1.1.1"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "@types/react-dom": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
+        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        },
+        "@types/react-dom": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-separator": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-separator/-/react-separator-1.1.1.tgz",
+      "integrity": "sha512-RRiNRSrD8iUiXriq/Y5n4/3iE8HzqgLHsusUSg5jVpU2+3tqcUFPJXHDymwEypunc2sWxDUS3UC+rkZRlHedsw==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/react-primitive": "2.0.1"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "@types/react-dom": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
+        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        },
+        "@types/react-dom": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-slot": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.1.1.tgz",
+      "integrity": "sha512-RApLLOcINYJA+dMVbOju7MYv1Mb2EBp2nH4HdDzXTSyaR5optlm6Otrz1euW3HbdOR8UmmFK06TD+A9frYWv+g==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/react-compose-refs": "1.1.1"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-use-callback-ref": {
+      "version": "1.1.0",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.1.0.tgz",
+      "integrity": "sha512-CasTfvsy+frcFkbXtSJ2Zu9JHpN8TYKxkgJGWbjiZhFivxaeW7rMeZt7QELGVLaYVfFMsKHjb7Ak0nMEe+2Vfw==",
+      "license": "MIT",
+      "peerDependencies": {
+        "@types/react": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-use-controllable-state": {
+      "version": "1.1.0",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.1.0.tgz",
+      "integrity": "sha512-MtfMVJiSr2NjzS0Aa90NPTnvTSg6C/JLCV7ma0W6+OMV78vd8OyRpID+Ng9LxzsPbLeuBnWBA1Nq30AtBIDChw==",
+      "license": "MIT",
+      "dependencies": {
+        "@radix-ui/react-use-callback-ref": "1.1.0"
+      },
+      "peerDependencies": {
+        "@types/react": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
+    "node_modules/@radix-ui/react-use-layout-effect": {
+      "version": "1.1.0",
+      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.1.0.tgz",
+      "integrity": "sha512-+FPE0rOdziWSrH9athwI1R0HDVbWlEhd+FR+aSDk4uWGmSJ9Z54sdZVDQPZAinJhJXwfT+qnj969mCsT2gfm5w==",
+      "license": "MIT",
+      "peerDependencies": {
+        "@types/react": "*",
+        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
+      },
+      "peerDependenciesMeta": {
+        "@types/react": {
+          "optional": true
+        }
+      }
+    },
     "node_modules/@rollup/pluginutils": {
       "version": "4.2.1",
       "resolved": "https://registry.npmjs.org/@rollup/pluginutils/-/pluginutils-4.2.1.tgz",
@@ -1431,6 +1728,64 @@
         "win32"
       ]
     },
+    "node_modules/@shadcn/ui": {
+      "version": "0.0.4",
+      "resolved": "https://registry.npmjs.org/@shadcn/ui/-/ui-0.0.4.tgz",
+      "integrity": "sha512-0dtu/5ApsOZ24qgaZwtif8jVwqol7a4m1x5AxPuM1k5wxhqU7t/qEfBGtaSki1R8VlbTQfCj5PAlO45NKCa7Gg==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "chalk": "5.2.0",
+        "commander": "^10.0.0",
+        "execa": "^7.0.0",
+        "fs-extra": "^11.1.0",
+        "node-fetch": "^3.3.0",
+        "ora": "^6.1.2",
+        "prompts": "^2.4.2",
+        "zod": "^3.20.2"
+      },
+      "bin": {
+        "ui": "dist/index.js"
+      }
+    },
+    "node_modules/@shadcn/ui/node_modules/chalk": {
+      "version": "5.2.0",
+      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.2.0.tgz",
+      "integrity": "sha512-ree3Gqw/nazQAPuJJEy+avdl7QfZMcUvmHIKgEZkGL+xOBzRvup5Hxo6LHuMceSxOabuJLJm5Yp/92R9eMmMvA==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": "^12.17.0 || ^14.13 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/chalk/chalk?sponsor=1"
+      }
+    },
+    "node_modules/@shadcn/ui/node_modules/commander": {
+      "version": "10.0.1",
+      "resolved": "https://registry.npmjs.org/commander/-/commander-10.0.1.tgz",
+      "integrity": "sha512-y4Mg2tXshplEbSGzx7amzPwKKOCGuoSRP/CjEdwwk0FOGlUbq6lKuoyDZTNZkmxHdJtp54hdfY/JUrdL7Xfdug==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=14"
+      }
+    },
+    "node_modules/@shadcn/ui/node_modules/fs-extra": {
+      "version": "11.3.0",
+      "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-11.3.0.tgz",
+      "integrity": "sha512-Z4XaCL6dUDHfP/jT25jJKMmtxvuwbkrD1vNSMFlo9lNLY2c5FHYSQgHPRZUjAB26TpDEoW9HCOgplrdbaPV/ew==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "graceful-fs": "^4.2.0",
+        "jsonfile": "^6.0.1",
+        "universalify": "^2.0.0"
+      },
+      "engines": {
+        "node": ">=14.14"
+      }
+    },
     "node_modules/@types/babel__core": {
       "version": "7.20.5",
       "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
@@ -1504,14 +1859,14 @@
       "version": "15.7.14",
       "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.14.tgz",
       "integrity": "sha512-gNMvNH49DJ7OJYv+KAKn0Xp45p8PLl6zo2YnvDIbTd4J6MER2BmWN49TG7n9LvkyihINxeKW8+3bfS2yDC9dzQ==",
-      "dev": true,
+      "devOptional": true,
       "license": "MIT"
     },
     "node_modules/@types/react": {
       "version": "18.3.18",
       "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.18.tgz",
       "integrity": "sha512-t4yC+vtgnkYjNSKlFx1jkAhH8LgTo2N/7Qvi83kdEaUtMDiwpbLAktKDaAMlRcJ5eSxZkH74eEGt1ky31d7kfQ==",
-      "dev": true,
+      "devOptional": true,
       "license": "MIT",
       "dependencies": {
         "@types/prop-types": "*",
@@ -1522,7 +1877,7 @@
       "version": "18.3.5",
       "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.3.5.tgz",
       "integrity": "sha512-P4t6saawp+b/dFrUr2cvkVsfvPguwsxtH6dNIYRllMsefqFzkZk5UIjzyDOv5g1dXIPdG4Sp1yCR4Z6RCUsG/Q==",
-      "dev": true,
+      "devOptional": true,
       "license": "MIT",
       "peerDependencies": {
         "@types/react": "^18.0.0"
@@ -1936,6 +2291,27 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/base64-js": {
+      "version": "1.5.1",
+      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
+      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
+      "dev": true,
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/feross"
+        },
+        {
+          "type": "patreon",
+          "url": "https://www.patreon.com/feross"
+        },
+        {
+          "type": "consulting",
+          "url": "https://feross.org/support"
+        }
+      ],
+      "license": "MIT"
+    },
     "node_modules/binary-extensions": {
       "version": "2.3.0",
       "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
@@ -1949,6 +2325,18 @@
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
+    "node_modules/bl": {
+      "version": "5.1.0",
+      "resolved": "https://registry.npmjs.org/bl/-/bl-5.1.0.tgz",
+      "integrity": "sha512-tv1ZJHLfTDnXE6tMHv73YgSJaWR2AFuPwMntBe7XL/GBFHnT0CLnsHMogfk5+GzCDC5ZWarSCYaIGATZt9dNsQ==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "buffer": "^6.0.3",
+        "inherits": "^2.0.4",
+        "readable-stream": "^3.4.0"
+      }
+    },
     "node_modules/boolbase": {
       "version": "1.0.0",
       "resolved": "https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz",
@@ -2013,6 +2401,31 @@
         "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
       }
     },
+    "node_modules/buffer": {
+      "version": "6.0.3",
+      "resolved": "https://registry.npmjs.org/buffer/-/buffer-6.0.3.tgz",
+      "integrity": "sha512-FTiCpNxtwiZZHEZbcbTIcZjERVICn9yq/pDFkTl95/AxzD1naBctN7YO68riM/gLSDY7sdrMby8hofADYuuqOA==",
+      "dev": true,
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/feross"
+        },
+        {
+          "type": "patreon",
+          "url": "https://www.patreon.com/feross"
+        },
+        {
+          "type": "consulting",
+          "url": "https://feross.org/support"
+        }
+      ],
+      "license": "MIT",
+      "dependencies": {
+        "base64-js": "^1.3.1",
+        "ieee754": "^1.2.1"
+      }
+    },
     "node_modules/callsites": {
       "version": "3.1.0",
       "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
@@ -2165,6 +2578,45 @@
         "url": "https://polar.sh/cva"
       }
     },
+    "node_modules/cli-cursor": {
+      "version": "4.0.0",
+      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-4.0.0.tgz",
+      "integrity": "sha512-VGtlMu3x/4DOtIUwEkRezxUZ2lBacNJCHash0N0WeZDBS+7Ux1dm3XWAgWYxLJFMMdOeXMHXorshEFhbMSGelg==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "restore-cursor": "^4.0.0"
+      },
+      "engines": {
+        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/cli-spinners": {
+      "version": "2.9.2",
+      "resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-2.9.2.tgz",
+      "integrity": "sha512-ywqV+5MmyL4E7ybXgKys4DugZbX0FC6LnwrhjuykIjnK9k8OQacQ7axGKnjDXWNhns0xot3bZI5h55H8yo9cJg==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/clone": {
+      "version": "1.0.4",
+      "resolved": "https://registry.npmjs.org/clone/-/clone-1.0.4.tgz",
+      "integrity": "sha512-JQHZ2QMW6l3aH/j6xCqQThY/9OH4D/9ls34cgkUBiEeocRTU04tHfKPBsUK1PqZCUQM7GiA0IIXJSuXHI64Kbg==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=0.8"
+      }
+    },
     "node_modules/clsx": {
       "version": "2.1.1",
       "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
@@ -2280,9 +2732,19 @@
       "version": "3.1.3",
       "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.3.tgz",
       "integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==",
-      "dev": true,
+      "devOptional": true,
       "license": "MIT"
     },
+    "node_modules/data-uri-to-buffer": {
+      "version": "4.0.1",
+      "resolved": "https://registry.npmjs.org/data-uri-to-buffer/-/data-uri-to-buffer-4.0.1.tgz",
+      "integrity": "sha512-0R9ikRb668HB7QDxT1vkpuUBtqc53YyAwMwGeUFKRojY/NWKvdZ+9UYtRfGmhqNbRkTSVpMbmyhXipFFv2cb/A==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">= 12"
+      }
+    },
     "node_modules/debug": {
       "version": "4.4.0",
       "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.0.tgz",
@@ -2308,6 +2770,19 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/defaults": {
+      "version": "1.0.4",
+      "resolved": "https://registry.npmjs.org/defaults/-/defaults-1.0.4.tgz",
+      "integrity": "sha512-eFuaLoy/Rxalv2kr+lqMlUnrDWV+3j4pljOIJgLIhI058IQfWJ7vXhyEIHu+HtC738klGALYxOKDO0bQP3tg8A==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "clone": "^1.0.2"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/didyoumean": {
       "version": "1.2.2",
       "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
@@ -2684,6 +3159,37 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/execa": {
+      "version": "7.2.0",
+      "resolved": "https://registry.npmjs.org/execa/-/execa-7.2.0.tgz",
+      "integrity": "sha512-UduyVP7TLB5IcAQl+OzLyLcS/l32W/GLg+AhHJ+ow40FOk2U3SAllPwR44v4vmdFwIWqpdwxxpQbF1n5ta9seA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "cross-spawn": "^7.0.3",
+        "get-stream": "^6.0.1",
+        "human-signals": "^4.3.0",
+        "is-stream": "^3.0.0",
+        "merge-stream": "^2.0.0",
+        "npm-run-path": "^5.1.0",
+        "onetime": "^6.0.0",
+        "signal-exit": "^3.0.7",
+        "strip-final-newline": "^3.0.0"
+      },
+      "engines": {
+        "node": "^14.18.0 || ^16.14.0 || >=18.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/sindresorhus/execa?sponsor=1"
+      }
+    },
+    "node_modules/execa/node_modules/signal-exit": {
+      "version": "3.0.7",
+      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
+      "integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==",
+      "dev": true,
+      "license": "ISC"
+    },
     "node_modules/fast-deep-equal": {
       "version": "3.1.3",
       "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
@@ -2745,6 +3251,30 @@
         "reusify": "^1.0.4"
       }
     },
+    "node_modules/fetch-blob": {
+      "version": "3.2.0",
+      "resolved": "https://registry.npmjs.org/fetch-blob/-/fetch-blob-3.2.0.tgz",
+      "integrity": "sha512-7yAQpD2UMJzLi1Dqv7qFYnPbaPx7ZfFK6PiIxQ4PfkGPyNyl2Ugx+a/umUonmKqjhM4DnfbMvdX6otXq83soQQ==",
+      "dev": true,
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/jimmywarting"
+        },
+        {
+          "type": "paypal",
+          "url": "https://paypal.me/jimmywarting"
+        }
+      ],
+      "license": "MIT",
+      "dependencies": {
+        "node-domexception": "^1.0.0",
+        "web-streams-polyfill": "^3.0.3"
+      },
+      "engines": {
+        "node": "^12.20 || >= 14.13"
+      }
+    },
     "node_modules/file-entry-cache": {
       "version": "8.0.0",
       "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
@@ -2826,6 +3356,19 @@
         "url": "https://github.com/sponsors/isaacs"
       }
     },
+    "node_modules/formdata-polyfill": {
+      "version": "4.0.10",
+      "resolved": "https://registry.npmjs.org/formdata-polyfill/-/formdata-polyfill-4.0.10.tgz",
+      "integrity": "sha512-buewHzMvYL29jdeQTVILecSaZKnt/RJWjoZCF5OW60Z67/GmSLBkOFM7qh1PI3zFNtJbaZL5eQu1vLfazOwj4g==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "fetch-blob": "^3.1.2"
+      },
+      "engines": {
+        "node": ">=12.20.0"
+      }
+    },
     "node_modules/fraction.js": {
       "version": "4.3.7",
       "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
@@ -2890,6 +3433,19 @@
         "node": ">=6.9.0"
       }
     },
+    "node_modules/get-stream": {
+      "version": "6.0.1",
+      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-6.0.1.tgz",
+      "integrity": "sha512-ts6Wi+2j3jQjqi70w5AlN8DFnkSwC+MqmxEzdEALB2qXZYV3X/b1CTfgPLGJNMeAWxdPfU8FO1ms3NUfaHCPYg==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=10"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/glob": {
       "version": "10.4.5",
       "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
@@ -3020,6 +3576,16 @@
         "entities": "^4.5.0"
       }
     },
+    "node_modules/human-signals": {
+      "version": "4.3.1",
+      "resolved": "https://registry.npmjs.org/human-signals/-/human-signals-4.3.1.tgz",
+      "integrity": "sha512-nZXjEF2nbo7lIw3mgYjItAfgQXog3OjJogSbKa2CQIIvSGWcKgeJnQlNXip6NglNzYH45nSRiEVimMvYL8DDqQ==",
+      "dev": true,
+      "license": "Apache-2.0",
+      "engines": {
+        "node": ">=14.18.0"
+      }
+    },
     "node_modules/iconv-lite": {
       "version": "0.6.3",
       "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
@@ -3033,6 +3599,27 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/ieee754": {
+      "version": "1.2.1",
+      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
+      "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
+      "dev": true,
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/feross"
+        },
+        {
+          "type": "patreon",
+          "url": "https://www.patreon.com/feross"
+        },
+        {
+          "type": "consulting",
+          "url": "https://feross.org/support"
+        }
+      ],
+      "license": "BSD-3-Clause"
+    },
     "node_modules/ignore": {
       "version": "5.3.2",
       "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
@@ -3070,6 +3657,13 @@
         "node": ">=0.8.19"
       }
     },
+    "node_modules/inherits": {
+      "version": "2.0.4",
+      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
+      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
+      "dev": true,
+      "license": "ISC"
+    },
     "node_modules/is-binary-path": {
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
@@ -3132,6 +3726,19 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/is-interactive": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/is-interactive/-/is-interactive-2.0.0.tgz",
+      "integrity": "sha512-qP1vozQRI+BMOPcjFzrjXuQvdak2pHNUMZoeG2eRbiSqyvbEf/wQtEOTOX1guk6E3t36RkaqiSt8A/6YElNxLQ==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=12"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/is-number": {
       "version": "7.0.0",
       "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
@@ -3142,6 +3749,32 @@
         "node": ">=0.12.0"
       }
     },
+    "node_modules/is-stream": {
+      "version": "3.0.0",
+      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-3.0.0.tgz",
+      "integrity": "sha512-LnQR4bZ9IADDRSkvpqMGvt/tEJWclzklNgSw48V5EAaAeDd6qGvN8ei6k5p0tvxSR171VmGyHuTiAOfxAbr8kA==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/is-unicode-supported": {
+      "version": "1.3.0",
+      "resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-1.3.0.tgz",
+      "integrity": "sha512-43r2mRvz+8JRIKnWJ+3j8JtjRKZ6GmjzfaE/qiBJnikNnYv/6bagRJ1kUhNk8R5EX/GkobD+r+sfxCPJsiKBLQ==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=12"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/isexe": {
       "version": "2.0.0",
       "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
@@ -3264,6 +3897,16 @@
         "json-buffer": "3.0.1"
       }
     },
+    "node_modules/kleur": {
+      "version": "3.0.3",
+      "resolved": "https://registry.npmjs.org/kleur/-/kleur-3.0.3.tgz",
+      "integrity": "sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      }
+    },
     "node_modules/levn": {
       "version": "0.4.1",
       "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
@@ -3318,6 +3961,36 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/log-symbols": {
+      "version": "5.1.0",
+      "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-5.1.0.tgz",
+      "integrity": "sha512-l0x2DvrW294C9uDCoQe1VSU4gf529FkSZ6leBl4TiqZH/e+0R7hSfHQBNut2mNygDgHwvYHfFLn6Oxb3VWj2rA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "chalk": "^5.0.0",
+        "is-unicode-supported": "^1.1.0"
+      },
+      "engines": {
+        "node": ">=12"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/log-symbols/node_modules/chalk": {
+      "version": "5.4.1",
+      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.4.1.tgz",
+      "integrity": "sha512-zgVZuo2WcZgfUEmsn6eO3kINexW8RAE4maiQ8QNs8CtpPCSyMiYsULR3HQYkm3w8FIA3SberyMJMSldGsW+U3w==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": "^12.17.0 || ^14.13 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/chalk/chalk?sponsor=1"
+      }
+    },
     "node_modules/loose-envify": {
       "version": "1.4.0",
       "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
@@ -3340,6 +4013,15 @@
         "yallist": "^3.0.2"
       }
     },
+    "node_modules/lucide-react": {
+      "version": "0.474.0",
+      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.474.0.tgz",
+      "integrity": "sha512-CmghgHkh0OJNmxGKWc0qfPJCYHASPMVSyGY8fj3xgk4v84ItqDg64JNKFZn5hC6E0vHi6gxnbCgwhyVB09wQtA==",
+      "license": "ISC",
+      "peerDependencies": {
+        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
+      }
+    },
     "node_modules/magic-string": {
       "version": "0.30.17",
       "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.17.tgz",
@@ -3350,6 +4032,13 @@
         "@jridgewell/sourcemap-codec": "^1.5.0"
       }
     },
+    "node_modules/merge-stream": {
+      "version": "2.0.0",
+      "resolved": "https://registry.npmjs.org/merge-stream/-/merge-stream-2.0.0.tgz",
+      "integrity": "sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/merge2": {
       "version": "1.4.1",
       "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
@@ -3374,6 +4063,19 @@
         "node": ">=8.6"
       }
     },
+    "node_modules/mimic-fn": {
+      "version": "4.0.0",
+      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-4.0.0.tgz",
+      "integrity": "sha512-vqiC06CuhBTUdZH+RYl8sFrL096vA45Ok5ISO6sE/Mr1jRbGH4Csnhi8f3wKVl7x8mO4Au7Ir9D3Oyv1VYMFJw==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=12"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/minimatch": {
       "version": "3.1.2",
       "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
@@ -3442,6 +4144,45 @@
       "dev": true,
       "license": "MIT"
     },
+    "node_modules/node-domexception": {
+      "version": "1.0.0",
+      "resolved": "https://registry.npmjs.org/node-domexception/-/node-domexception-1.0.0.tgz",
+      "integrity": "sha512-/jKZoMpw0F8GRwl4/eLROPA3cfcXtLApP0QzLmUT/HuPCZWyB7IY9ZrMeKw2O/nFIqPQB3PVM9aYm0F312AXDQ==",
+      "dev": true,
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/jimmywarting"
+        },
+        {
+          "type": "github",
+          "url": "https://paypal.me/jimmywarting"
+        }
+      ],
+      "license": "MIT",
+      "engines": {
+        "node": ">=10.5.0"
+      }
+    },
+    "node_modules/node-fetch": {
+      "version": "3.3.2",
+      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-3.3.2.tgz",
+      "integrity": "sha512-dRB78srN/l6gqWulah9SrxeYnxeddIG30+GOqK/9OlLVyLg3HPnr6SqOWTWOXKRwC2eGYCkZ59NNuSgvSrpgOA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "data-uri-to-buffer": "^4.0.0",
+        "fetch-blob": "^3.1.4",
+        "formdata-polyfill": "^4.0.10"
+      },
+      "engines": {
+        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
+      },
+      "funding": {
+        "type": "opencollective",
+        "url": "https://opencollective.com/node-fetch"
+      }
+    },
     "node_modules/node-releases": {
       "version": "2.0.19",
       "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.19.tgz",
@@ -3469,6 +4210,35 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/npm-run-path": {
+      "version": "5.3.0",
+      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-5.3.0.tgz",
+      "integrity": "sha512-ppwTtiJZq0O/ai0z7yfudtBpWIoxM8yE6nHi1X47eFR2EWORqfbu6CnPlNsjeN683eT0qG6H/Pyf9fCcvjnnnQ==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "path-key": "^4.0.0"
+      },
+      "engines": {
+        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/npm-run-path/node_modules/path-key": {
+      "version": "4.0.0",
+      "resolved": "https://registry.npmjs.org/path-key/-/path-key-4.0.0.tgz",
+      "integrity": "sha512-haREypq7xkM7ErfgIyA0z+Bj4AGKlMSdlQE2jvJo6huWD1EdkKYV+G/T4nq0YEF2vgTT8kqMFKo1uHn950r4SQ==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=12"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/nth-check": {
       "version": "2.1.1",
       "resolved": "https://registry.npmjs.org/nth-check/-/nth-check-2.1.1.tgz",
@@ -3502,6 +4272,22 @@
         "node": ">= 6"
       }
     },
+    "node_modules/onetime": {
+      "version": "6.0.0",
+      "resolved": "https://registry.npmjs.org/onetime/-/onetime-6.0.0.tgz",
+      "integrity": "sha512-1FlR+gjXK7X+AsAHso35MnyN5KqGwJRi/31ft6x0M194ht7S+rWAvd7PHss9xSKMzE0asv1pyIHaJYq+BbacAQ==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "mimic-fn": "^4.0.0"
+      },
+      "engines": {
+        "node": ">=12"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/optionator": {
       "version": "0.9.4",
       "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
@@ -3520,6 +4306,43 @@
         "node": ">= 0.8.0"
       }
     },
+    "node_modules/ora": {
+      "version": "6.3.1",
+      "resolved": "https://registry.npmjs.org/ora/-/ora-6.3.1.tgz",
+      "integrity": "sha512-ERAyNnZOfqM+Ao3RAvIXkYh5joP220yf59gVe2X/cI6SiCxIdi4c9HZKZD8R6q/RDXEje1THBju6iExiSsgJaQ==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "chalk": "^5.0.0",
+        "cli-cursor": "^4.0.0",
+        "cli-spinners": "^2.6.1",
+        "is-interactive": "^2.0.0",
+        "is-unicode-supported": "^1.1.0",
+        "log-symbols": "^5.1.0",
+        "stdin-discarder": "^0.1.0",
+        "strip-ansi": "^7.0.1",
+        "wcwidth": "^1.0.1"
+      },
+      "engines": {
+        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/ora/node_modules/chalk": {
+      "version": "5.4.1",
+      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.4.1.tgz",
+      "integrity": "sha512-zgVZuo2WcZgfUEmsn6eO3kINexW8RAE4maiQ8QNs8CtpPCSyMiYsULR3HQYkm3w8FIA3SberyMJMSldGsW+U3w==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": "^12.17.0 || ^14.13 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/chalk/chalk?sponsor=1"
+      }
+    },
     "node_modules/p-limit": {
       "version": "3.1.0",
       "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
@@ -3876,6 +4699,20 @@
         "node": ">= 0.8.0"
       }
     },
+    "node_modules/prompts": {
+      "version": "2.4.2",
+      "resolved": "https://registry.npmjs.org/prompts/-/prompts-2.4.2.tgz",
+      "integrity": "sha512-NxNv/kLguCA7p3jE8oL2aEBsrJWgAakBpgmgK6lpPWV+WuOmY6r2/zbAVnP+T8bQlA0nzHXSJSJW0Hq7ylaD2Q==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "kleur": "^3.0.3",
+        "sisteransi": "^1.0.5"
+      },
+      "engines": {
+        "node": ">= 6"
+      }
+    },
     "node_modules/punycode": {
       "version": "2.3.1",
       "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
@@ -3952,6 +4789,21 @@
         "pify": "^2.3.0"
       }
     },
+    "node_modules/readable-stream": {
+      "version": "3.6.2",
+      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
+      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "inherits": "^2.0.3",
+        "string_decoder": "^1.1.1",
+        "util-deprecate": "^1.0.1"
+      },
+      "engines": {
+        "node": ">= 6"
+      }
+    },
     "node_modules/readdirp": {
       "version": "3.6.0",
       "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
@@ -3996,6 +4848,56 @@
         "node": ">=4"
       }
     },
+    "node_modules/restore-cursor": {
+      "version": "4.0.0",
+      "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-4.0.0.tgz",
+      "integrity": "sha512-I9fPXU9geO9bHOt9pHHOhOkYerIMsmVaWB0rA2AI9ERh/+x/i7MV5HKBNrg+ljO5eoPVgCcnFuRjJ9uH6I/3eg==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "onetime": "^5.1.0",
+        "signal-exit": "^3.0.2"
+      },
+      "engines": {
+        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/restore-cursor/node_modules/mimic-fn": {
+      "version": "2.1.0",
+      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
+      "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      }
+    },
+    "node_modules/restore-cursor/node_modules/onetime": {
+      "version": "5.1.2",
+      "resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.2.tgz",
+      "integrity": "sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "mimic-fn": "^2.1.0"
+      },
+      "engines": {
+        "node": ">=6"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/restore-cursor/node_modules/signal-exit": {
+      "version": "3.0.7",
+      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
+      "integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==",
+      "dev": true,
+      "license": "ISC"
+    },
     "node_modules/reusify": {
       "version": "1.0.4",
       "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
@@ -4080,6 +4982,27 @@
         "tslib": "^2.1.0"
       }
     },
+    "node_modules/safe-buffer": {
+      "version": "5.2.1",
+      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
+      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
+      "dev": true,
+      "funding": [
+        {
+          "type": "github",
+          "url": "https://github.com/sponsors/feross"
+        },
+        {
+          "type": "patreon",
+          "url": "https://www.patreon.com/feross"
+        },
+        {
+          "type": "consulting",
+          "url": "https://feross.org/support"
+        }
+      ],
+      "license": "MIT"
+    },
     "node_modules/safer-buffer": {
       "version": "2.1.2",
       "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
@@ -4142,6 +5065,13 @@
         "url": "https://github.com/sponsors/isaacs"
       }
     },
+    "node_modules/sisteransi": {
+      "version": "1.0.5",
+      "resolved": "https://registry.npmjs.org/sisteransi/-/sisteransi-1.0.5.tgz",
+      "integrity": "sha512-bLGGlR1QxBcynn2d5YmDX4MGjlZvy2MRBDRNHLJ8VI6l6+9FUiyTFNJ0IveOSP0bcXgVDPRcfGqA0pjaqUpfVg==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/source-map-js": {
       "version": "1.2.1",
       "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
@@ -4152,6 +5082,32 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/stdin-discarder": {
+      "version": "0.1.0",
+      "resolved": "https://registry.npmjs.org/stdin-discarder/-/stdin-discarder-0.1.0.tgz",
+      "integrity": "sha512-xhV7w8S+bUwlPTb4bAOUQhv8/cSS5offJuX8GQGq32ONF0ZtDWKfkdomM3HMRA+LhX6um/FZ0COqlwsjD53LeQ==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "bl": "^5.0.0"
+      },
+      "engines": {
+        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
+    "node_modules/string_decoder": {
+      "version": "1.3.0",
+      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
+      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "safe-buffer": "~5.2.0"
+      }
+    },
     "node_modules/string-width": {
       "version": "5.1.2",
       "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
@@ -4256,6 +5212,19 @@
         "node": ">=8"
       }
     },
+    "node_modules/strip-final-newline": {
+      "version": "3.0.0",
+      "resolved": "https://registry.npmjs.org/strip-final-newline/-/strip-final-newline-3.0.0.tgz",
+      "integrity": "sha512-dOESqjYr96iWYylGObzd39EuNTa5VJxyvVAEm5Jnh7KGo75V43Hk1odPQkNDyXNmUR6k+gEiDVXnjB8HJ3crXw==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=12"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/strip-json-comments": {
       "version": "3.1.1",
       "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
@@ -4655,6 +5624,26 @@
         "node": "^10 || ^12 || >=14"
       }
     },
+    "node_modules/wcwidth": {
+      "version": "1.0.1",
+      "resolved": "https://registry.npmjs.org/wcwidth/-/wcwidth-1.0.1.tgz",
+      "integrity": "sha512-XHPEwS0q6TaxcvG85+8EYkbiCux2XtWG2mkc47Ng2A77BQu9+DqIOJldST4HgPkuea7dvKSj5VgX3P1d4rW8Tg==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "defaults": "^1.0.3"
+      }
+    },
+    "node_modules/web-streams-polyfill": {
+      "version": "3.3.3",
+      "resolved": "https://registry.npmjs.org/web-streams-polyfill/-/web-streams-polyfill-3.3.3.tgz",
+      "integrity": "sha512-d2JWLCivmZYTSIoge9MsgFCZrt571BikcWGYkjC1khllbTeDlGqZ2D8vD8E/lJa8WGWbb7Plm8/XJYV7IJHZZw==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">= 8"
+      }
+    },
     "node_modules/whatwg-encoding": {
       "version": "3.1.1",
       "resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-3.1.1.tgz",
@@ -4831,6 +5820,16 @@
       "funding": {
         "url": "https://github.com/sponsors/sindresorhus"
       }
+    },
+    "node_modules/zod": {
+      "version": "3.24.1",
+      "resolved": "https://registry.npmjs.org/zod/-/zod-3.24.1.tgz",
+      "integrity": "sha512-muH7gBL9sI1nciMZV67X5fTKKBLtwpZ5VBp1vsOQzj1MhrBZ4wlVCm3gedKZWLp0Oyel8sIGfeiz54Su+OVT+A==",
+      "dev": true,
+      "license": "MIT",
+      "funding": {
+        "url": "https://github.com/sponsors/colinhacks"
+      }
     }
   }
 }
diff --git a/package.json b/package.json
index 78a793e..f7156bc 100644
--- a/package.json
+++ b/package.json
@@ -13,8 +13,12 @@
     "preview": "vite preview"
   },
   "dependencies": {
+    "@radix-ui/react-accordion": "^1.2.2",
+    "@radix-ui/react-collapsible": "^1.1.2",
+    "@radix-ui/react-separator": "^1.1.1",
     "class-variance-authority": "^0.7.1",
     "clsx": "^2.1.1",
+    "lucide-react": "^0.474.0",
     "react": "^18.3.1",
     "react-dom": "^18.3.1",
     "tailwind-merge": "^2.6.0"
@@ -22,6 +26,7 @@
   "devDependencies": {
     "@crxjs/vite-plugin": "^2.0.0-beta.30",
     "@eslint/js": "^9.18.0",
+    "@shadcn/ui": "^0.0.4",
     "@types/node": "^22.10.10",
     "@types/react": "^18.3.18",
     "@types/react-dom": "^18.3.5",
diff --git a/src/App.tsx b/src/App.tsx
index faeda1a..a7e3488 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,9 +1,55 @@
 import { Button } from './components/Button'
+import { Card } from './components/ui/card'
+import { Separator } from './components/ui/separator'
+import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'
+import { InfoIcon, AlertCircle } from 'lucide-react'
 
 function App() {
   return (
-    <div className="flex min-h-screen items-center justify-center p-4 bg-zinc-900">
-      <Button>Analyze Text</Button>
+    <div className="flex flex-col p-4 bg-zinc-900 min-h-screen">
+      {/* Main Score Card */}
+      <Card className="p-4 bg-zinc-800 border-zinc-700">
+        <div className="flex items-center justify-between mb-4">
+          <h2 className="text-xl font-semibold">Trust Score</h2>
+          <span className="text-2xl font-bold text-green-400">85%</span>
+        </div>
+        <div className="flex items-center gap-2 text-sm text-zinc-400">
+          <InfoIcon size={16} />
+          <span>Based on content analysis</span>
+        </div>
+      </Card>
+
+      <Separator className="my-4 bg-zinc-700" />
+
+      {/* Analysis Section */}
+      <div className="space-y-4">
+        <Button className="w-full">
+          Analyze Current Page
+        </Button>
+
+        {/* Advanced Controls */}
+        <Accordion type="single" collapsible>
+          <AccordionItem value="advanced">
+            <AccordionTrigger className="text-sm">
+              Advanced Controls
+            </AccordionTrigger>
+            <AccordionContent>
+              <div className="space-y-4 p-2">
+                <div className="flex items-start gap-2">
+                  <AlertCircle size={16} className="text-yellow-500 mt-1" />
+                  <p className="text-sm text-zinc-400">
+                    Advanced analysis includes source verification, fact-checking against trusted databases, 
+                    and sentiment analysis.
+                  </p>
+                </div>
+                <Button variant="outline" className="w-full">
+                  Run Deep Analysis
+                </Button>
+              </div>
+            </AccordionContent>
+          </AccordionItem>
+        </Accordion>
+      </div>
     </div>
   )
 }
diff --git a/src/components/Button.tsx b/src/components/Button.tsx
index 2151614..fb59dad 100644
--- a/src/components/Button.tsx
+++ b/src/components/Button.tsx
@@ -1,18 +1,29 @@
 import { cn } from '../lib/utils'
 import { ButtonHTMLAttributes, forwardRef } from 'react'
 
-export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
+export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
+  variant?: 'default' | 'outline'
+}
 
 export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
-  ({ className, children, ...props }, ref) => {
+  ({ className, variant = 'default', children, ...props }, ref) => {
     return (
       <button
         className={cn(
           'inline-flex items-center justify-center rounded-md px-4 py-2',
-          'bg-zinc-900 text-white',
-          'border border-zinc-700/50',
-          'hover:bg-zinc-800 transition-colors',
+          'transition-colors',
           'focus:outline-none focus:ring-2 focus:ring-zinc-600',
+          variant === 'default' && [
+            'bg-zinc-900 text-white',
+            'border border-zinc-700/50',
+            'hover:bg-zinc-800'
+          ],
+          variant === 'outline' && [
+            'border border-zinc-700',
+            'bg-transparent',
+            'hover:bg-zinc-800/50',
+            'text-zinc-300'
+          ],
           className
         )}
         ref={ref}
