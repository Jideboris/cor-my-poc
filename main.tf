# We strongly recommend using the required_providers block to set the
# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.5.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "tf_test" {
  name = "tfmainrg"
  location = "West Europe"
}

resource "azurerm_container_group" "tfcg_test" {
  name               ="reactdocker"
  location           =azurerm_resource_group.tf_test.location
  resource_group_name=azurerm_resource_group.tf_test.name
  ip_address_type     = "public"
  dns_name_label      = "jideborisdocker"
  os_type             = "Linux"

   container {
    name   = "reactdocker"
    image  = "jideborisdocker/react-docker:react-docker"
    cpu    = "1"
    memory = "1"

    ports {
      port     = 80
      protocol = "TCP"
    }
  }
}
