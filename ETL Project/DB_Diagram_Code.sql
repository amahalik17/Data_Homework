-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Ue4cxH
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Physical

CREATE TABLE "gdp_table" (
    "2008" VARCHAR(30)   NOT NULL,
    "2009" VARCHAR(30)   NOT NULL,
    "2010" VARCHAR(30)   NOT NULL,
    "2011" VARCHAR(30)   NOT NULL,
    "id" serial   NOT NULL,
    "Country_Name" VARCHAR(30)   NOT NULL,
    "Country_Code" VARCHAR(10)   NOT NULL,
    CONSTRAINT "pk_gdp_table" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "life_table" (
    "1011" VARCHAR(30)   NOT NULL,
    "2008" VARCHAR(30)   NOT NULL,
    "2009" VARCHAR(30)   NOT NULL,
    "2010" VARCHAR(30)   NOT NULL,
    "id" serial   NOT NULL,
    "Country_Name" VARCHAR(30)   NOT NULL,
    "Country_Code" VARCHAR(10)   NOT NULL,
    CONSTRAINT "pk_life_table" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "merged_table" (
    "id" serial   NOT NULL,
    "Country_Name" VARCHAR(30)   NOT NULL,
    "Country_Code" VARCHAR(10)   NOT NULL,
    "2008_GDP_Dollars" VARCHAR(30)   NOT NULL,
    "2009_GDP_Dollars" VARCHAR(30)   NOT NULL,
    "2010_GDP_Dollars" VARCHAR(30)   NOT NULL,
    "2011_GDP_Dollars" VARCHAR(30)   NOT NULL,
    "2008_Life_Exp_Yrs" VARCHAR(30)   NOT NULL,
    "2009_Life_Exp_Yrs" VARCHAR(30)   NOT NULL,
    "2010_Life_Exp_Yrs" VARCHAR(30)   NOT NULL,
    "2011_Life_Exp_Yrs" VARCHAR(30)   NOT NULL,
    CONSTRAINT "pk_merged_table" PRIMARY KEY (
        "id"
     )
);

