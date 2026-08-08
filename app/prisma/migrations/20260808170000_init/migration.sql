CREATE TABLE "PortfolioProfile" (
    "id" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioProfile_pkey" PRIMARY KEY ("id")
);

INSERT INTO "PortfolioProfile" ("id", "introduction", "createdAt", "updatedAt")
VALUES (
    'portfolio-profile',
    'I create focused digital experiences and photograph the people, places, and details that make them meaningful.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
