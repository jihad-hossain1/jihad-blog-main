"use client";

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const MyProjectPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-6  py-2 min-h-screen">
      <div className="flex justify-between items-center my-6">
        <h4 className="text-gray-500 text-2xl font-semibold">Portfolio</h4>
        <h4 className="text-gray-500">{`${5} Projects`}</h4>
      </div>
      <div>
        <Tabs>
          <TabList className="flex space-x-5 items-center">
            <Tab className="cursor-pointer bg-gray-50/80 px-2 border-none active:outline-none uppercase focus:outline-none focus:bg-transparent focus:text-gray-800">
              All
            </Tab>
            <Tab className="cursor-pointer bg-gray-50/80 px-2  border-none active:outline-none uppercase focus:outline-none">
              Applications
            </Tab>
            <Tab className="cursor-pointer bg-gray-50/80 px-2  border-none active:outline-none uppercase focus:outline-none">
              Frameworks
            </Tab>
            <Tab className="cursor-pointer bg-gray-50/80 px-2  border-none active:outline-none uppercase focus:outline-none">
              Scripts
            </Tab>
            <Tab className="cursor-pointer bg-gray-50/80 px-2  border-none active:outline-none uppercase focus:outline-none">
              Layouts
            </Tab>
            <Tab className="cursor-pointer bg-gray-50/80 px-2  border-none active:outline-none uppercase focus:outline-none">
              Components
            </Tab>
          </TabList>

          <TabPanel>
            <div className="mt-6">Any content 1</div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">Any content 2</div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">Any content 3</div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">Any content 4</div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">Any content 5</div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">Any content 6</div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MyProjectPage;
