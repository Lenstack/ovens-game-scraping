# Variables
PKG = npx pkg
SOURCE_DIR = src
BUILD_DIR = build
PLATFORMS = linux mac win
TARGETS = $(addprefix $(BUILD_DIR)/$(SOURCE_DIR)-, $(PLATFORMS))

# Targets
.PHONY: all clean $(PLATFORMS)

all: $(TARGETS)

clean:
	rm -rf $(BUILD_DIR)

$(PLATFORMS): %: $(BUILD_DIR)/$(SOURCE_DIR)-%
	@echo "Generated binary for $*"

$(BUILD_DIR)/$(SOURCE_DIR)-%: $(SOURCE_DIR)/*
	@echo "Building $*"
	$(PKG) -o $@/$* -t node18-$* $(SOURCE_DIR)/index.js --public

# Usage: make package PLATFORM=<platform>
# Example: make package PLATFORM=mac
package:
	$(PKG) -o $(BUILD_DIR)/$(PLATFORM) -t node18-$(PLATFORM) $(SOURCE_DIR)/index.js

# Usage: make run PLATFORM=<platform>
# Example: make run PLATFORM=mac
run: $(BUILD_DIR)/$(SOURCE_DIR)-$(PLATFORM)
	$<

# Usage: make run-package PLATFORM=<platform>
# Example: make run-package PLATFORM=mac
run-package: package
	$(BUILD_DIR)/$(PLATFORM)