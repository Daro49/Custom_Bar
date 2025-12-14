/**
 * File: Packages.js
 * Author: Samuel Kudla <xkudlas00@stud.fit.vutbr.cz>
 * Brief: Functions for packages API
 */

import { ref } from 'vue';
import { addToast } from '../ToastStore';
import { addPoints } from '../AddPoints';
import { activeUser } from '../Login';
export const packages = ref([]);
export const pkg = ref([]);

/**
 * @brief Function fetching all packages
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export async function getPackages() {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/packages`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Fetching packages failed');
    }

    const data = await response.json();

    packages.value = data;

    return true;
  } catch (error) {
    console.error('Packages error:', error);
    alert('Error occured while fetching packages:' + error.message);
    return false;
  }
}

/**
 * @brief Function getting one package via id
 * @param {Number} id
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export async function getPackageById(id) {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/packages/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Fetching package failed');
    }

    const data = await response.json();
    pkg.value = data;

    return true;
  } catch (error) {
    console.error('Package error:', error);
    alert('Error occured while fetching package:' + error.message);
    return false;
  }
}

/**
 * @brief Function adding package to order
 * @param {string} username
 * @param {Object} pkg Package object to be added to order
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export async function orderPackage(username, pkg) {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/packages/${username}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pkg: pkg })
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.error || 'Unkown error'
      };
    }

    return { success: true };
  }
  catch (error) {
    return {
      success: false,
      message: 'Network error: ' + error.message
    };
  }
}

/**
 * @brief Function removing package from order via id
 * @param {string} username
 * @param {Number} pkgId Id of package to be removed from order
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export async function removePackageFromOrder(username, pkgId) {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/packages/${username}/remove/${pkgId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Removing package failed.');
    }
    return true;
  } catch (error) {
    console.error('Pakcage removal error:', error);
    alert('Error occured while removing package from order: ' + error.message);
    return false;
  }
}

/**
 * Orchestrates the package ordering process including validation, 
 * server-side ordering, point deduction, and error handling.
 * @param {Object} currentPkg The package object being ordered
 * @param {Object} stateRefs Object containing errorMsg and isErr refs for UI feedback
 * @returns {Promise<boolean>} True if order was successful, false otherwise
 */
export async function processPackageOrder(currentPkg) {

  if (activeUser.value.points < currentPkg.price) {
    addToast("Failed to add to cart. Not enough points!");
    return false;
  }

  if (!activeUser.value.table) {
    addToast("Failed to add to cart. Please select table first.");
    return false;
  }

  const result = await orderPackage(activeUser.value.username, currentPkg);
  if (!result.success) {
    if (result.status === 440) {
      addToast("Failed to add to cart. Package already in order!");
    } else {
      addToast("Error adding package to order!");
    }
    return false;
  }

  const pointsResult = await addPoints(-currentPkg.price);
  if (!pointsResult) {
    alert("Error occurred while updating points");
    removePackageFromOrder(activeUser.value.username, currentPkg.id);
    return false;
  }

  addToast("Package successfully added to order!");
  return true;
}